package backend.dao;

import backend.MySQLConnection;
import backend.model.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;

public class UsuarioDAO {

    public UsuarioDAO(MySQLConnection mySQLConnection) {
        // Mantido para compatibilidade com AuthController, que instancia o DAO com essa assinatura.
    }

    public Usuario findByUsername(String nomeUsuario) {
        String sql = "SELECT * FROM usuarios WHERE nome_usuario = ?";
        try (Connection conn = MySQLConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, nomeUsuario);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return mapUsuario(rs);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Usuario findById(int idUsuario) {
        String sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
        try (Connection conn = MySQLConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, idUsuario);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return mapUsuario(rs);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean usernameExists(String nomeUsuario) {
        String sql = "SELECT 1 FROM usuarios WHERE nome_usuario = ? LIMIT 1";
        try (Connection conn = MySQLConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, nomeUsuario);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean emailExists(String email) {
        String sql = "SELECT 1 FROM usuarios WHERE email = ? LIMIT 1";
        try (Connection conn = MySQLConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean create(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nome_usuario, email, senha, nome_completo, foto_perfil, tipo_acesso) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = MySQLConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, usuario.getNomeUsuario());
            ps.setString(2, usuario.getEmail());
            ps.setString(3, usuario.getSenha());
            ps.setString(4, usuario.getNomeCompleto());
            ps.setString(5, usuario.getFotoPerfil());
            ps.setString(6, usuario.getTipoAcesso());
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean update(Usuario usuario) {
        String sql = "UPDATE usuarios SET nome_completo = ?, email = ?, foto_perfil = ? WHERE id_usuario = ?";
        try (Connection conn = MySQLConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, usuario.getNomeCompleto());
            ps.setString(2, usuario.getEmail());
            ps.setString(3, usuario.getFotoPerfil());
            ps.setInt(4, usuario.getIdUsuario());
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private Usuario mapUsuario(ResultSet rs) throws Exception {
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(rs.getInt("id_usuario"));
        usuario.setNomeUsuario(rs.getString("nome_usuario"));
        usuario.setEmail(rs.getString("email"));
        usuario.setSenha(rs.getString("senha"));
        usuario.setNomeCompleto(rs.getString("nome_completo"));
        usuario.setFotoPerfil(rs.getString("foto_perfil"));
        usuario.setTipoAcesso(rs.getString("tipo_acesso"));

        Timestamp dataCriacao = rs.getTimestamp("data_criacao");
        Timestamp dataAtualizacao = rs.getTimestamp("data_atualizacao");
        if (dataCriacao != null) {
            usuario.setDataCriacao(dataCriacao.toLocalDateTime());
        }
        if (dataAtualizacao != null) {
            usuario.setDataAtualizacao(dataAtualizacao.toLocalDateTime());
        }
        return usuario;
    }
}
