import React, { useState } from 'react';
import Carousel from '../funcionalidades/Carousel';
import ConselhoSilencioso from '../assets/images/ConselhoSilencioso.png';
import Ciclope from '../assets/images/ciclope.jpg';
import Genosha from '../assets/images/New-X-Men-Genosha-Destruction.jpg';
import Magneto from '../assets/images/magneto.jpg';
import Ororo from '../assets/images/ororo.jpg';
import Psylocke from '../assets/images/psylocke.jpg';
import Xavier from '../assets/images/xavier.jpg';
import ArmaX from '../assets/images/armax.jpg';
import Magneto2 from '../assets/images/magneto2.jpg';

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
            titulo: "Ciclope: Liderança e Revolução Mutante",
            conteudo: [
                "Scott Summers, o Ciclope, surgiu como um líder disciplinado dos X-Men, conhecido por sua visão estratégica e por assumir responsabilidades em momentos de crise.",
                "Com o aumento da perseguição aos mutantes e sucessivas perdas da comunidade, sua liderança passou de uma postura essencialmente defensiva para uma abordagem mais firme e confrontadora.",
                "Essa mudança o colocou em choque com antigos aliados e dividiu opiniões entre os próprios mutantes: para alguns, ele havia se tornado radical; para outros, era o único disposto a agir para garantir a sobrevivência do povo mutante.",
                "Ao lado de figuras como Emma Frost, Magik e Magneto, Ciclope conduziu uma fase marcada por mobilização política, treinamento de novos mutantes e resistência organizada, consolidando sua imagem como símbolo de uma revolução mutante."
            ],
            imagem: Ciclope,
            alt: "Imagem de Scott Summers, o Ciclope."
        },
        {
            titulo: "O Massacre de Genosha",
            conteudo: [
                "Genosha havia se tornado um grande território mutante, mas foi alvo de um dos ataques mais traumáticos da história dos X-Men.",
                "Cassandra Nova controla os Sentinelas Selvagens e inicia um extermínio em massa contra a população da ilha.",
                "O ataque resulta na morte de aproximadamente 16 milhões de mutantes, mudando radicalmente o rumo político e emocional da comunidade mutante.",
                "O impacto foi profundo entre sobreviventes, aliados e lideranças mutantes, que passaram a encarar Genosha como símbolo máximo da vulnerabilidade de uma nação mutante diante de ameaças globais.",
                "Depois da tragédia, o massacre passou a influenciar decisões políticas de diferentes facções, fortalecendo discursos de autodefesa, soberania e preparação militar para evitar um novo genocídio.",
                "O Massacre de Genosha marcou uma virada no universo X-Men, intensificando debates sobre segurança, diplomacia, memória coletiva e responsabilidade internacional diante da perseguição aos mutantes."
            ],
            imagem: Genosha,
            alt: "Imagem de Genosha.",
            classeImagem: "artigo-imagem--genosha"
        },
        {
            titulo: "Magneto: Passado, Trauma e Ideologia",
            conteudo: [
                "Magneto, conhecido como Max Eisenhardt (também Erik Lehnsherr), é retratado nos quadrinhos como um sobrevivente judeu do Holocausto.",
                "Sua juventude durante o nazismo e a experiência em Auschwitz moldaram sua visão de que minorias perseguidas precisam de autodefesa radical para não serem exterminadas novamente.",
                "As biografias de Marvel também destacam perdas pessoais profundas, como a morte de familiares e tragédias que reforçam seu rompimento com a confiança nas instituições humanas.",
                "Por isso, Magneto oscila entre aliado e antagonista dos X-Men: ele luta pela preservação mutante a qualquer custo, em constante choque com a estratégia de coexistência pacífica de Xavier."
            ],
            imagem: Magneto,
            alt: "Imagem de Magneto.",
            classeImagem: "artigo-imagem--magneto"
        },
        {
            titulo: "Ororo Munroe: A Mutante Vista Como Deusa",
            conteudo: [
                "Ororo Munroe, nossa Tempestade, é uma das mutantes mais poderosas já registradas pelo Cérebro. Sua conexão com a atmosfera permite controlar ventos, chuvas, raios e frentes climáticas com precisão estratégica.",
                "Antes de integrar os X-Men, Ororo já era reverenciada em regiões africanas como uma figura sagrada, especialmente em comunidades dependentes do ciclo de chuvas. Esse passado marcou sua visão de responsabilidade: para ela, poder sem cuidado é apenas destruição.",
                "Nos períodos de maior crise, Tempestade assumiu liderança em campo e fora dele, coordenando equipes, operações de evacuação e decisões políticas em nome da segurança mutante.",
                "Entre os nossos, Ororo representa equilíbrio raro: força suficiente para enfrentar ameaças globais e humanidade suficiente para lembrar que cada missão envolve vidas reais, não apenas vitórias táticas."
            ],
            imagem: Ororo,
            alt: "Imagem de Ororo Munroe."
        },
        {
            titulo: "Kwannon e Betsy Braddock: Identidade, Corpo e Reconstrução",
            conteudo: [
                "Os registros sobre Kwannon e Betsy Braddock ficaram, por muito tempo, entre os dossiês mais confusos da nossa história recente. Interferências externas causaram sobreposição de corpo, memória e identidade entre as duas.",
                "Durante anos, agentes, aliados e até inimigos trataram Psylocke como se fosse uma única pessoa com passado fragmentado. Na prática, isso apagou fronteiras importantes entre as duas trajetórias.",
                "Com a separação definitiva, Betsy retomou seu próprio caminho e Kwannon reassumiu o nome Psylocke com autonomia plena, estratégia própria e papel ativo nas frentes mutantes.",
                "Hoje, o entendimento oficial é claro: são duas combatentes distintas, ambas essenciais. O que antes era confusão virou reconstrução, e essa reparação mudou a forma como tratamos identidade dentro da comunidade mutante."
            ],
            imagem: Psylocke,
            alt: "Imagem de Kwannon e Betsy Braddock."
        },
        {
            titulo: "Professor Xavier e Decisões Suspeitas",
            conteudo: [
                "Charles Xavier fundou os X-Men e ofereceu à nossa espécie um projeto de coexistência quando quase ninguém acreditava nisso. Ainda assim, parte de seu legado é marcada por decisões tomadas em sigilo.",
                "O episódio envolvendo Gabriel Summers permanece como um dos pontos mais sensíveis: após uma missão de resgate catastrófica, perdas graves foram ocultadas por anos, inclusive de pessoas diretamente envolvidas com a equipe.",
                "Quando a verdade emergiu, a crítica principal não foi apenas operacional, mas ética: quem tem o direito de esconder tragédias em nome de estabilidade? Até onde um líder pode controlar memória e informação?",
                "Dentro da história mutante, Xavier é lembrado como visionário e, ao mesmo tempo, como alerta. Seu exemplo mostra que grandes ideais podem ser comprometidos quando transparência e responsabilidade são sacrificadas pelo chamado “bem maior”."
            ],
            imagem: Xavier,
            alt: "Imagem do Professor Xavier."
        },
        {
            titulo: "Projeto Arma X: Ciência, Violência e Controle",
            conteudo: [
                "O Projeto Arma X foi um programa clandestino de militarização de indivíduos com capacidades especiais, conduzido sem qualquer compromisso com direitos básicos ou consentimento real.",
                "O caso mais conhecido é o de Logan, submetido ao procedimento de ligação de adamantium ao esqueleto. O resultado aumentou sua letalidade, mas deixou cicatrizes físicas e psicológicas permanentes.",
                "Relatórios relacionados ao programa apontam padrões recorrentes: condicionamento forçado, fragmentação de memória, apagamento de identidade e uso de pessoas como ativos descartáveis.",
                "Para a comunidade mutante, Arma X é mais que um capítulo sombrio do passado: é prova concreta de como medo institucional e tecnologia sem limites podem transformar vidas em ferramentas de guerra."
            ],
            imagem: ArmaX,
            alt: "Imagem sobre o Projeto Arma X."
        },
        {
            titulo: "Quando Magneto se Ajoelhou Diante de Ciclope",
            conteudo: [
                "O gesto aconteceu em Utopia, no período em que a comunidade mutante estava sob pressão constante: população reduzida, ataques frequentes, isolamento político e ameaça real de extinção.",
                "Naquele momento, Scott Summers havia assumido decisões duras para manter Utopia viva, organizando defesa, cadeia de comando e resposta imediata a crises. Muitos discordavam do método, mas quase todos reconheciam que ele estava sustentando a linha de frente.",
                "Magneto, que por anos representou uma via rival à dos X-Men, avaliou o cenário e concluiu que a prioridade não era disputar liderança, e sim impedir o colapso mutante. Ao se ajoelhar diante de Ciclope, ele declarou apoio público e legitimou a autoridade de Scott para conduzir a nação em crise.",
                "O impacto foi histórico: não foi um ato de submissão pessoal, mas um pacto político diante de uma emergência coletiva. Em Utopia, aquele ajoelhamento simbolizou a união de correntes antes opostas em torno de um único objetivo: sobreviver."
            ],
            imagem: Magneto2,
            alt: "Imagem simbólica do reconhecimento de Magneto a Ciclope."
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
                                <img
                                    src={s.imagem}
                                    alt={s.alt}
                                    className={`artigo-imagem ${s.classeImagem ?? ''}`}
                                />
                            </div>
                        </div>
                    </div>
                )}
            />
        </section>
    );
}
