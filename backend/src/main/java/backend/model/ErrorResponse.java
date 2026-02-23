package backend.model;

public class ErrorResponse {
    private String mensagem;
    private String erro;

    public ErrorResponse() {}

    public ErrorResponse(String mensagem) {
        this.mensagem = mensagem;
    }

    public ErrorResponse(String mensagem, String erro) {
        this.mensagem = mensagem;
        this.erro = erro;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getErro() {
        return erro;
    }

    public void setErro(String erro) {
        this.erro = erro;
    }
}
