package backend.controller;

import backend.dao.UsuarioDAO;
import backend.model.*;
import backend.MySQLConnection;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
    
    private UsuarioDAO usuarioDAO;
    private BCryptPasswordEncoder passwordEncoder;

    public AuthController() {
        this.usuarioDAO = new UsuarioDAO(new MySQLConnection());
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // Endpoint de login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Validar entrada
        if (request.getNomeUsuario() == null || request.getNomeUsuario().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Nome de usuário é obrigatório"));
        }
        if (request.getSenha() == null || request.getSenha().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Senha é obrigatória"));
        }

        // Buscar usuário no banco
        Usuario usuario = usuarioDAO.findByUsername(request.getNomeUsuario());
        
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Usuário não encontrado"));
        }

        // Validar senha
        if (!passwordEncoder.matches(request.getSenha(), usuario.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Senha incorreta"));
        }

        // Retornar dados do usuário
        LoginResponse response = new LoginResponse(
                usuario.getIdUsuario(),
                usuario.getNomeUsuario(),
                usuario.getNomeCompleto(),
                usuario.getEmail(),
                usuario.getTipoAcesso(),
                usuario.getFotoPerfil()
        );

        return ResponseEntity.ok(response);
    }

    // Endpoint de registro
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Validações
        if (request.getNomeUsuario() == null || request.getNomeUsuario().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Nome de usuário é obrigatório"));
        }
        if (request.getNomeUsuario().length() < 3) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Nome de usuário deve ter pelo menos 3 caracteres"));
        }
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Email é obrigatório"));
        }
        if (request.getNomeCompleto() == null || request.getNomeCompleto().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Nome completo é obrigatório"));
        }
        if (request.getSenha() == null || request.getSenha().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Senha é obrigatória"));
        }
        if (request.getSenha().length() < 6) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Senha deve ter pelo menos 6 caracteres"));
        }
        if (!request.getSenha().equals(request.getConfirmarSenha())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("As senhas não coincidem"));
        }

        // Verificar se username já existe
        if (usuarioDAO.usernameExists(request.getNomeUsuario())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Nome de usuário já existe"));
        }

        // Verificar se email já existe
        if (usuarioDAO.emailExists(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Email já cadastrado"));
        }

        // Criar novo usuário com permissão 'usuario'
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNomeUsuario(request.getNomeUsuario());
        novoUsuario.setEmail(request.getEmail());
        novoUsuario.setNomeCompleto(request.getNomeCompleto());
        novoUsuario.setSenha(passwordEncoder.encode(request.getSenha()));
        novoUsuario.setTipoAcesso("usuario");

        // Salvar no banco
        if (usuarioDAO.create(novoUsuario)) {
            // Buscar o usuário criado para enviar response
            Usuario usuarioCriado = usuarioDAO.findByUsername(request.getNomeUsuario());
            LoginResponse response = new LoginResponse(
                    usuarioCriado.getIdUsuario(),
                    usuarioCriado.getNomeUsuario(),
                    usuarioCriado.getNomeCompleto(),
                    usuarioCriado.getEmail(),
                    usuarioCriado.getTipoAcesso(),
                    usuarioCriado.getFotoPerfil()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao registrar usuário"));
        }
    }

    // Endpoint para obter usuário por ID
    @GetMapping("/usuario/{id}")
    public ResponseEntity<?> getUsuario(@PathVariable int id) {
        Usuario usuario = usuarioDAO.findById(id);
        
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Usuário não encontrado"));
        }

        LoginResponse response = new LoginResponse(
                usuario.getIdUsuario(),
                usuario.getNomeUsuario(),
                usuario.getNomeCompleto(),
                usuario.getEmail(),
                usuario.getTipoAcesso(),
                usuario.getFotoPerfil()
        );

        return ResponseEntity.ok(response);
    }

    // Endpoint para atualizar usuário
    @PutMapping("/usuario/{id}")
    public ResponseEntity<?> updateUsuario(@PathVariable int id, @RequestBody Usuario usuarioAtualizado) {
        Usuario usuario = usuarioDAO.findById(id);
        
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Usuário não encontrado"));
        }

        usuario.setNomeCompleto(usuarioAtualizado.getNomeCompleto());
        usuario.setEmail(usuarioAtualizado.getEmail());
        usuario.setFotoPerfil(usuarioAtualizado.getFotoPerfil());

        if (usuarioDAO.update(usuario)) {
            LoginResponse response = new LoginResponse(
                    usuario.getIdUsuario(),
                    usuario.getNomeUsuario(),
                    usuario.getNomeCompleto(),
                    usuario.getEmail(),
                    usuario.getTipoAcesso(),
                    usuario.getFotoPerfil()
            );
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao atualizar usuário"));
        }
    }

    // Endpoint para cadastrar novo admin (apenas admins podem fazer)
    @PostMapping("/admin/register")
    public ResponseEntity<?> registerAdmin(@RequestBody RegisterRequest request) {
        // Validações
        if (request.getNomeUsuario() == null || request.getNomeUsuario().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Nome de usuário é obrigatório"));
        }
        if (usuarioDAO.usernameExists(request.getNomeUsuario())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Nome de usuário já existe"));
        }
        if (usuarioDAO.emailExists(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Email já cadastrado"));
        }

        // Criar novo admin
        Usuario novoAdmin = new Usuario();
        novoAdmin.setNomeUsuario(request.getNomeUsuario());
        novoAdmin.setEmail(request.getEmail());
        novoAdmin.setNomeCompleto(request.getNomeCompleto());
        novoAdmin.setSenha(passwordEncoder.encode(request.getSenha()));
        novoAdmin.setTipoAcesso("admin");

        if (usuarioDAO.create(novoAdmin)) {
            Usuario adminCriado = usuarioDAO.findByUsername(request.getNomeUsuario());
            LoginResponse response = new LoginResponse(
                    adminCriado.getIdUsuario(),
                    adminCriado.getNomeUsuario(),
                    adminCriado.getNomeCompleto(),
                    adminCriado.getEmail(),
                    adminCriado.getTipoAcesso(),
                    adminCriado.getFotoPerfil()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao registrar admin"));
        }
    }
}
