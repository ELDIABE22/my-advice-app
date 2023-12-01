import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [adviceId, setAdviceId] = useState(0);
  const [advice, setAdvice] = useState('');
  const [cargando, setCargando] = useState(false);

  const urlApiAdvice = 'https://api.adviceslip.com/advice';
  const urlApiTranslated = 'https://libretranslate.de/translate';

  const handleFetchData = async () => {
    setCargando(true);

    try {
      const response = await axios.get(urlApiAdvice);
      const { data } = response;

      const adviceId = data.slip.id;

      // Función para realizar la traducción
      const traducirConsejo = async (consejo) => {
        const dataTraducir = {
          q: consejo,
          source: 'en',
          target: 'es'
        };

        try {
          const respuesta = await axios.post(urlApiTranslated, dataTraducir);
          return respuesta.data.translatedText;
        } catch (error) {
          console.error('Error en la traducción:', error);
          return consejo;
        }
      };

      // Traducir el consejo y establecer el estado
      const consejoTraducido = await traducirConsejo(data.slip.advice);
      setAdvice(consejoTraducido);

      setAdviceId(adviceId);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCargando(true);

        const response = await axios.get(urlApiAdvice);
        const { data } = response;

        const adviceId = data.slip.id;

        // Función para realizar la traducción
        const traducirConsejo = async (consejo) => {
          const dataTraducir = {
            q: consejo,
            source: 'en',
            target: 'es'
          };

          try {
            const respuesta = await axios.post(urlApiTranslated, dataTraducir);
            return respuesta.data.translatedText;
          } catch (error) {
            console.error('Error en la traducción:', error);
            return consejo;
          }
        };

        // Traducir el consejo y establecer el estado
        const consejoTraducido = await traducirConsejo(data.slip.advice);
        setAdvice(consejoTraducido);

        setAdviceId(adviceId);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [urlApiAdvice, urlApiTranslated]);

  return (
    <div className="relative bg-dark-grayish-blue px-7 box-content shadow-2xl flex flex-col items-center rounded-lg max-w-[390px]">
      <span className="text-[10px] py-6 text-neon-green tracking-[3px]">CONSEJO #{adviceId}</span>
      {cargando ? (
        <p className=" text-light-cyan mb-5 text-2xl text-center">Cargando consejo...</p>
      )
        : (
          <p className=" text-light-cyan mb-5 text-2xl text-center">{advice}</p>
        )
      }
      <img className="mb-16 object-cover" src="/pattern-divider-mobile.svg" />
      <button className=" absolute -bottom-8 flex items-center justify-center bg-neon-green w-16 h-16 rounded-full md:cursor-pointer md:hover:shadow-custom" onClick={handleFetchData}>
        <img src="/icon-dice.svg" />
      </button>
    </div>
  )
}

export default App
