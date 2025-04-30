import React from 'react';
import { FileText, Shield, AlertTriangle, HelpCircle } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center mb-4">
            <FileText className="h-6 w-6 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">1. Aceitação dos Termos</h2>
          </div>
          <p className="text-neutral-600">
            Ao acessar ou utilizar o site de notícias ("Site"), você concorda com estes Termos de Serviço e com nossa Política de Privacidade. Se não concordar, por favor, não utilize o Site.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Definições</h2>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <ul className="space-y-4 text-neutral-600">
                <li>• "Usuário": qualquer pessoa que acesse o Site.</li>
                <li>• "Administrador": você, responsável por criar e publicar notícias.</li>
                <li>• "Conteúdo": textos, imagens e demais materiais publicados no Site.</li>
                <li>• "IA": sistemas de inteligência artificial empregados para auxiliar na redação de notícias.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Cadastro e Acesso de Administrador</h2>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="text-neutral-600 mb-4">3.1. Para criar ou editar notícias, é necessário efetuar login como Administrador.</p>
              <p className="text-neutral-600">3.2. As credenciais de acesso são pessoais e intransferíveis. Você é responsável por mantê-las em segurança.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Criação e Publicação de Conteúdo</h2>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="text-neutral-600 mb-4">4.1. As notícias podem ser redigidas manualmente ou com auxílio de IA, utilizando informações já disponíveis publicamente em blogs, sites de notícias e demais fontes na Internet.</p>
              <p className="text-neutral-600 mb-4">4.2. É responsabilidade do Administrador:</p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Verificar a veracidade e a atualidade das informações;</li>
                <li>Citar corretamente as fontes originais quando for exigido por lei ou pelas práticas jornalísticas;</li>
                <li>Evitar conteúdo difamatório, discriminatório ou protegido por direitos autorais sem autorização.</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold">5. Direitos Autorais e Propriedade Intelectual</h2>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="text-neutral-600 mb-4">5.1. Todo o conteúdo publicado é protegido por direitos autorais. Ao utilizar IA para geração de texto, você declara que a saída não infringe direitos de terceiros.</p>
              <p className="text-neutral-600">5.2. O Site detém o direito de reproduzir, modificar e exibir publicamente os conteúdos para fins de operação e divulgação do serviço.</p>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold">6. Responsabilidades</h2>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="text-neutral-600 mb-4">6.1. Você, como Administrador, responde integralmente por qualquer infração legal decorrente de publicações indevidas, bem como por demandas de terceiros.</p>
              <p className="text-neutral-600">6.2. O Site não se responsabiliza por eventuais erros de IA. É fundamental revisar e aprovar todo texto antes da publicação.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Conduta Proibida</h2>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="text-neutral-600 mb-4">Você concorda em não usar o Site para:</p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Veicular conteúdos ilegais, difamatórios, discriminatórios ou que violem direitos de propriedade intelectual;</li>
                <li>Gerar notícias com intenção de enganar, induzir ao erro ou fomentar desinformação;</li>
                <li>Práticas automatizadas que comprometam a performance do Site sem autorização.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Moderação e Exclusão de Conteúdo</h2>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="text-neutral-600">
                O Site reserva-se o direito de excluir ou alterar qualquer notícia a qualquer tempo, sem aviso prévio, caso sejam identificadas violações a estes Termos.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Alterações nos Termos</h2>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="text-neutral-600">
                Podemos revisar estes Termos periodicamente. Publicaremos a versão atualizada no Site e passará a valer a partir de sua publicação. Recomendamos a revisão regular.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Lei Aplicável e Foro</h2>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="text-neutral-600">
                Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de sua cidade para dirimir quaisquer controvérsias.
              </p>
            </div>
          </section>

          <section className="bg-neutral-100 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <HelpCircle className="h-6 w-6 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold">Dúvidas?</h2>
            </div>
            <p className="text-neutral-600">
              Se você tiver alguma dúvida sobre estes Termos de Serviço, entre em contato conosco através do email terms@newsportal.com.
            </p>
            <p className="text-sm text-neutral-500 mt-4">
              Última atualização: 15 de março de 2024
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;