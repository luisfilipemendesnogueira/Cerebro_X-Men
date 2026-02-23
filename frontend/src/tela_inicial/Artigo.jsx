import React, { useState } from 'react';
import Carousel from '../funcionalidades/Carousel';
import ConselhoSilencioso from '../assets/images/ConselhoSilencioso.png';
import EscolaXavier from '../assets/images/escola_xavier.png';
import Genosha from '../assets/images/genosha.jpg';
import DangerRoom from '../assets/images/danger_room.jpg';

export default function Artigo() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const artigo = [
        {
            titulo: "Krakoa, uma Nação Mutante!",
            conteudo: [
                "Krakoa é uma ilha viva e mutante que se tornou o lar seguro e soberano para todos os mutantes, funcionando como uma nação independente com governo próprio, leis, sistemas de defesa e infraestrutura.",
                "Ela simboliza a união da comunidade mutante, ao mesmo tempo em que mantém relações diplomáticas e comerciais com o mundo exterior, exportando tecnologias e produtos médicos derivados de mutantes.",
                "Protegida pelos X-Men e suas forças de defesa, Krakoa combina segurança, autonomia e inovação, promovendo sustentabilidade, educação e crescimento contínuo de seus cidadãos, consolidando-se como um lar de esperança, liberdade e prosperidade para a comunidade mutante.",
                "Sua política é organizada em torno do Conselho Silencioso, composto por doze membros que representam diferentes facções e interesses da comunidade mutante, tomando decisões por consenso e refletindo uma governança colaborativa, estratégica e focada no bem coletivo."
            ],
            imagem: ConselhoSilencioso,
            alt: "Imagem do Conselho Silencioso de Krakoa."
        },
        {
            titulo: "A Escola para Superdotados Charles Xavier",
            conteudo: [
                "A Escola para Superdotados Charles Xavier é uma instituição dedicada ao ensino e proteção de mutantes jovens, oferecendo educação acadêmica de qualidade junto com treinamento especializado para controlar e aprimorar seus poderes mutantes.",
                "Fundada pelo Professor Charles Xavier, a escola serve como um refúgio seguro onde mutantes podem aprender a conviver pacificamente com a sociedade humana e desenvolver suas habilidades de forma responsável.",
                "Além da educação formal, a escola oferece programas de treinamento tático, aconselhamento emocional e desenvolvimento de liderança, preparando a próxima geração de heróis que trabalharão pela paz entre mutantes e humanos.",
                "Com suas instalações de última geração e corpo docente dedicado, a Escola Xavier continua sendo um símbolo de esperança e inclusão, demonstrando que mutantes e humanos podem coexistir harmoniosamente."
            ],
            imagem: EscolaXavier,
            alt: "Imagem da Escola para Superdotados Charles Xavier."
        },
        {
            titulo: "Genosha: Uma Nação Perdida",
            conteudo: [
                "Genosha foi um país poderoso na costa sul-africana que, no passado, era uma nação escravocrata que oprimia mutantes e os forçava ao trabalho servil através de uma tecnologia de controle mental.",
                "Após anos de lutas contra os X-Men e outros heróis, Genosha foi transformada em um refúgio para mutantes oprimidos, oferecendo liberdade e igualdade a todos os its habitantes mutantes.",
                "A nação de Genosha se tornou símbolo de resistência e esperança, representando um lugar onde mutantes poderiam viver livremente sem medo de perseguição ou escravidão.",
                "Apesar dos desafios políticos e conflitos internacionais, Genosha marcou a história como um importante capítulo na luta pelos direitos dos mutantes e sua busca por um lugar de verdadeira liberdade no mundo."
            ],
            imagem: Genosha,
            alt: "Imagem de Genosha."
        },
        {
            titulo: "A Sala de Perigo: Treinamento Extremo",
            conteudo: [
                "A Sala de Perigo é uma câmara de treinamento de realidade virtual de alta tecnologia localizada na Escola Xavier, projetada para simular cenários de combate e desafios extremos.",
                "Este sistema avançado permite que os mutantes treinem em ambientes controlados e progressivamente mais perigosos, preparando-se para situações reais sem risco de morte.",
                "A Sala de Perigo é capaz de simular desde combates contra vilões até desastres naturais e cenários apocalípticos, fornecendo experiência valiosa em um ambiente seguro.",
                "Sob supervisão, os X-Men usam a Sala de Perigo regularmente para aprimorar suas habilidades de combate em equipe e desenvolver estratégias táticas contra ameaças diversas do mundo real."
            ],
            imagem: DangerRoom,
            alt: "Imagem da Sala de Perigo."
        }
    ];

    return (
        <section id="artigo" className="container secao-artigo">
            <h2 className="titulo-secao">{artigo[currentIndex].titulo}</h2>
            <Carousel
                items={artigo}
                itemsPerView={1}
                onSlideChange={setCurrentIndex}
                renderItem={(s) => (
                    <div className="secao-artigo-conteudo">
                        <h3 className="titulo-artigo-carousel">{s.titulo}</h3>
                        <ul className="secao-artigo-lista">
                            {s.conteudo.map((texto, i) => (
                                <li key={i}>{texto}</li>
                            ))}
                        </ul>
                        <div className="secao-artigo-imagem-container">
                            <div className="secao-artigo-imagem-wrapper">
                                <a
                                    href="https://marvel.fandom.com/wiki/Quiet_Council_of_Krakoa_(Earth-616)"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src={s.imagem}
                                        alt={s.alt}
                                        className="imagem-conselho-silencioso"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            />
        </section>
    );
}
