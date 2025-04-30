import React from 'react';
import { Link } from 'react-router-dom';

interface TermsModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Termos de Uso</h2>
          </div>
          
          <div className="prose prose-sm max-w-none mb-6">
            <p>
              Bem-vindo ao NewsPortal. Antes de continuar, por favor, leia e aceite nossos termos de uso 
              e política de privacidade.
            </p>
            
            <p>
              Ao utilizar nosso site, você concorda em:
            </p>
            
            <ul>
              <li>Respeitar nossos termos de serviço e política de privacidade</li>
              <li>Aceitar o uso de cookies e tecnologias similares</li>
              <li>Receber atualizações e notificações importantes</li>
            </ul>
            
            <p>
              Para mais informações, consulte nossa{' '}
              <Link 
                to="/privacy-policy" 
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                Política de Privacidade
              </Link>
              {' '}e{' '}
              <Link 
                to="/terms" 
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                Termos de Serviço
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8 border-t pt-6">
            <button
              onClick={onDecline}
              className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
            >
              Ler Termos
            </button>
            <button
              onClick={onAccept}
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 font-medium"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;