package backend.model;

public class RegisterRequest {
    private String nomeUsuario;
    private String email;
    private String nomeCompleto;
    private String senha;
    private String confirmarSenha;

    public RegisterRequest() {}

    public RegisterRequest(String nomeUsuario, String email, String nomeCompleto, String senha, String confirmarSenha) {
        this.nomeUsuario = nomeUsuario;
        this.email = email;
        this.nomeCompleto = nomeCompleto;
        this.senha = senha;
        this.confirmarSenha = confirmarSenha;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getConfirmarSenha() {
        return confirmarSenha;
    }

    public void setConfirmarSenha(String confirmarSenha) {
        this.confirmarSenha = confirmarSenha;
    }
}
