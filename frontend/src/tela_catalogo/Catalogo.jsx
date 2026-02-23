import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import { auth } from '../utils/auth';

export default function Catalogo() {
    const [searchTerm, setSearchTerm] = useState('');
    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const user = auth.getCurrentUser();
    const isAdmin = user?.tipoAcesso === 'admin';
    const [formData, setFormData] = useState({
        alterEgo: '',
        nome: '',
        sobrenome: '',
        imagem: null,
        tipo: ''
    });

    const fetchMutantes = async () => {
        const res = await fetch('http://localhost:8080/api/mutantes');
        if (!res.ok) throw new Error('Backend não está pronto');

        const data = await res.json();
        const mappedCards = data.map(m => ({
            imagem: `http://localhost:8080/images/personagens/${m.imagem}`,
            titulo: m.alterEgo,
            info: `${m.nome} ${m.sobrenome}`.trim(),
            link: m.link
        }));

        setCards(mappedCards);
        setLoading(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        let isMounted = true;
        let intervalId;

        const pollMutantes = async () => {
            try {
                if (!isMounted) return;
                await fetchMutantes();
                clearInterval(intervalId);
            } catch (err) {
                console.log('Backend ainda não respondeu, tentando novamente...');
            }
        };

        pollMutantes();
        intervalId = setInterval(pollMutantes, 2000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, imagem: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.alterEgo.trim()) {
            alert("O campo 'Alter Ego' é obrigatório!");
            return;
        }
        if (!formData.nome.trim()) {
            alert("O campo 'Nome' é obrigatório!");
            return;
        }
        if (!formData.tipo.trim()) {
            alert("Selecione se é Herói ou Vilão!");
            return;
        }
        if (formData.alterEgo.length > 50 || formData.nome.length > 50 || formData.sobrenome.length > 50) {
            alert("Campos não podem ter mais que 50 caracteres!");
            return;
        }

        const form = new FormData();
        form.append('alterEgo', formData.alterEgo);
        form.append('nome', formData.nome);
        form.append('sobrenome', formData.sobrenome);
        form.append('tipo', formData.tipo);
        if (formData.imagem) form.append('imagem', formData.imagem);

        try {
            const res = await fetch('http://localhost:8080/api/mutantes', {
                method: 'POST',
                body: form
            });
            const msg = await res.text();

            if (!res.ok) {
                throw new Error(msg || 'Falha ao registrar mutante.');
            }

            await fetchMutantes();
            setShowModal(false);
            setFormData({
                alterEgo: '',
                nome: '',
                sobrenome: '',
                imagem: null,
                tipo: ''
            });
        } catch (err) {
            alert("Erro ao registrar: " + err.message);
        }
    };

    const filteredCards = cards.filter(card => {
        const searchTerms = searchTerm.toLowerCase().trim().split(/\s+/).filter(t => t.length > 0);
        if (searchTerms.length === 0) return true;
        const cardWords = `${card.titulo} ${card.info}`.toLowerCase().split(/\s+/);
        return searchTerms.every(term => cardWords.some(word => word.startsWith(term)));
    });

    return (
        <section id="cards" className="container secao-cards catalogo-page">
            {loading ? (
                <p className="loader-banco">Carregando banco de dados...</p>
            ) : (
                <>
                    <div className="header">
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <a href="/.." className="botao-header">Voltar</a>
                    </div>

                    <h2 className="titulo-secao">Mutantes Encontrados:</h2>

                    <Cards
                        items={filteredCards}
                        renderItem={(card) => (
                            <article
                                className="cartao cartao-card"
                                style={{ cursor: 'pointer' }}
                                onClick={() => card.link && window.open(card.link, "_blank")}
                            >
                                <img className="cartao-card__imagem" src={card.imagem} alt={card.titulo} />
                                <div className="cartao-card__conteudo">
                                    <h3 className="cartao-card__titulo">{card.titulo}</h3>
                                    <div className="cartao-card__info">
                                        <span>{card.info}</span>
                                    </div>
                                </div>
                            </article>
                        )}
                    />

                    {isAdmin && (
                        <div className="botao-registro">
                            <button
                                className="botao-catalogo registro"
                                type="button"
                                onClick={() => setShowModal(true)}
                            >
                                Registrar Novo Mutante
                            </button>
                        </div>
                    )}

                    {showModal && (
                        <div className="modal">
                            <div className="container secao-cards catalogo-page modal-content">
                                <h3 className="titulo-secao subtitulo">Registrar Novo Mutante:</h3>
                                <form onSubmit={handleSubmit}>
                                    <input type="text" name="alterEgo" placeholder="Alter Ego" maxLength={50} onChange={handleChange} />
                                    <input type="text" name="nome" placeholder="Nome" maxLength={50} onChange={handleChange} />
                                    <input type="text" name="sobrenome" placeholder="Sobrenome" maxLength={50} onChange={handleChange} />
                                    <select name="tipo" onChange={handleChange} required>
                                        <option value="">Selecione o tipo do personagem:</option>
                                        <option value="heroi">Herói</option>
                                        <option value="vilao">Vilão</option>
                                    </select>

                                    <div className="enviar-imagem">
                                        <h3 className="titulo-secao subtitulo">Enviar Imagem:</h3>
                                        <input type="file" name="imagem" accept="image/*" onChange={handleChange} />
                                    </div>

                                    <div className="botao-registro botao-modal">
                                        <button type="submit" className="botao-catalogo registro cancelar">Registrar</button>
                                        <button
                                            type="button"
                                            className="botao-catalogo registro cancelar"
                                            onClick={() => {
                                                setShowModal(false);
                                                setFormData({ alterEgo: '', nome: '', sobrenome: '', imagem: null, tipo: '' });
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
