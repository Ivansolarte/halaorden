import React from "react";
import { ModalContainer } from "../../elements/modal/modal";
import { ButtonClassic } from "../../elements/button/buttonClassic";
import { InputClassic } from "../../elements/input/inputClassic";

export const ModalTerms = ({ setShow, handleChangeText, form }) => {
  const handleTerms = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      e.target.value = "true";
      handleChangeText(e);
      console.log("verdadero");
    } else {
      e.target.value = "false";
      handleChangeText(e);
      console.log("falso");
    }
  };

  return (
    <ModalContainer>
      <div
        className="w-[350px] sm:w-[650px] border bg-slate-100 p-7 overflow-auto h-screen scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          overflow: "auto",
        }}
      >
        <div className="border bg-slate-50 mb-8 p-1 rounded-lg grid grid-cols-1 gap-5">
          <div>
            <p className="text-xl font-semibold">1. Publicación de Contenidos </p>
            <p>
              Está prohibido publicar artículos o servicios que infrinjan la
              legislación vigente en Colombia, incluyendo pero no limitado a
              contenido ilegal, fraudulento, ofensivo o que atente contra la
              moral y el orden público. A las Tiendas no se hace responsable por
              el contenido subido por los usuarios, pero nos reservamos el
              derecho de eliminar cualquier publicación que consideremos
              inapropiada o ilegal. Cada usuario es el único responsable del
              contenido que publique en la plataforma y asume todas las
              consecuencias legales que puedan derivarse de ello. En caso de
              denuncias, investigaciones o sanciones por parte de las
              autoridades, el usuario será el único responsable ante la ley.
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold">2. Responsabilidad de la Plataforma</p>
            <p>
              A las Tiendas actúa únicamente como un intermediario que permite a
              los usuarios publicar artículos o servicios. No garantizamos la
              veracidad, calidad, legalidad o exactitud del contenido publicado.
              No estamos involucrados en las transacciones entre usuarios.
              Cualquier acuerdo, pago o disputa entre partes es responsabilidad
              exclusiva de los involucrados. A las Tiendas se hace responsable
              únicamente de mostrar los productos que los dueños de las tiendas
              registran en la plataforma, incluyendo la imagen (URL
              proporcionada), nombre del producto y su valor. Los clientes no
              tendrán una cuenta ni registro dentro de la plataforma; solo
              podrán visualizar los productos y contactar directamente al
              vendedor a través de WhatsApp. Solo los dueños de los productos o
              quienes creen una cuenta para administrar una tienda podrán
              publicar y gestionar sus productos. A las Tiendas no modifica ni
              verifica la información de los productos publicados, siendo
              responsabilidad exclusiva del usuario que crea la tienda
              garantizar que la información es correcta y cumple con la
              normativa vigente. Nos reservamos el derecho de suspender o
              eliminar publicaciones y cuentas que incumplan estos términos o
              representen un riesgo para la comunidad.{" "}
            </p>
          </div>

          <div>
            <p className="text-xl font-semibold">3. Reglas para Publicar</p>
            <p className="px-6">
              Los usuarios pueden publicar productos o servicios en A las
              Tiendas, pero deben cumplir con las siguientes reglas:
              <ol className="list-disc">
                <li>
                  Los usuarios son responsables del contenido que publican y
                  deben asegurarse de que cumple con la legislación colombiana.
                  No se permite la publicación de productos o servicios ilegales
                  o indebidos.
                </li>
                <li>
                  Toda consecuencia derivada de la publicación de contenido
                  indebido será responsabilidad exclusiva del usuario,
                  incluyendo sanciones legales.
                </li>
                <li>
                  Las imágenes y la información proporcionadas deben ser
                  propiedad del usuario. Se permite el uso de imágenes obtenidas
                  de redes sociales u otros sitios, siempre que sean de su
                  propiedad y tengan derecho a utilizarlas.
                </li>
                <li>
                  {" "}
                  No está permitido copiar contenido de otros vendedores, redes
                  sociales o sitios web sin autorización.
                </li>
                <li>
                  Nos reservamos el derecho de suspender o eliminar
                  publicaciones y cuentas que incumplan estos términos o
                  representen un riesgo para la comunidad.
                </li>
              </ol>
            </p>
          </div>
          <div className=" flex items-center justify-start h-11">
            <p className="text-xl font-semibold mr-2">Acepta condiciones:</p>
            <div>
              {
                (console.log(typeof form.userTerms),
                console.log(form.userTerms == "true"))
              }
              <InputClassic
                type="checkbox"
                name={"userTerms"}
                value={form.userTerms == "true"}
                classs="border bg-red-500 h-24"
                checked={form.userTerms == "true"}
                onchange={handleTerms}
              />
            </div>
          </div>
          <div className="text-center ">
            <ButtonClassic
              type="error"
              text={"Cerrar"}
              onclick={() => setShow((state) => !state)}
            />
            <ButtonClassic
              text={"Acepto"}
              onclick={() => setShow((state) => !state)}
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
