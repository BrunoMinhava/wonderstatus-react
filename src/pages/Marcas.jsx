import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import BrandGrid from '../components/BrandGrid';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import { brandsByArea, padroesBrands } from '../data/brands';
import { crmBrands } from '../data/materiais-referencia-data';


export default function Marcas() {
  return (
    <PageTransition>
      <PageMeta
        title="Marcas Representadas — Equipamento Científico em Portugal"
        description="Marcas internacionais de equipamento científico representadas pela Wonderstatus em Portugal: JP SELECTA, NKE, Hydrobios, Seaber, Auxilab, CRUMA, Socorex, Milwaukee, ROFA e mais."
        path="/marcas"
      />
      <PageHeader
        kicker="Marcas e Fornecedores"
        title="Uma rede internacional de fabricantes parceiros"
        subtitle="Trabalhamos com fabricantes de referência em química analítica, oceanografia, material de laboratório e instrumentação AAS."
        image="/assets/slide1.JPG"
        actions={[
          { label: 'Pedir informação', href: '/sobre#formulario-contacto' }
        ]}
      />

      {/* Peixe Zebra */}
      <section className="section bg-ink-50">
        <div className="container-wide">
          <SectionHead
            kicker="Peixe Zebra"
            title="Análise Comportamental"
            description="Sistemas de rastreamento comportamental para investigação com peixe zebra — da fase embrionária ao adulto."
          />
          <div className="mt-8 md:mt-10">
            <ScrollReveal>
              <BrandGrid brands={brandsByArea.peixeZebra} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Química */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Química"
            title="Marcas de Química Analítica"
            description="Marcas parceiras para consumíveis e componentes de AAS, ICP/ICP-MS, CHNS e digestão."
          />
          <div className="mt-8 md:mt-10 space-y-12">
            <ScrollReveal>
              <BrandGrid
                brands={[...brandsByArea.quimica.exclusive, ...brandsByArea.quimica.icpExclusive]}
                kicker="Exclusivas"
                title="Marcas Exclusivas"
              />
            </ScrollReveal>
            <ScrollReveal>
              <BrandGrid
                brands={brandsByArea.quimica.others}
                kicker="Outras"
                title="Outras Marcas"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Compatibilidade AAS */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Compatibilidade AAS"
            title="Tubos de grafite e equivalentes por fabricante"
          />
          <div className="mt-8 md:mt-10">
            <BrandGrid brands={brandsByArea.aas} />
          </div>
        </div>
      </section>

      {/* Oceanografia */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Oceanografia"
            title="Marcas de Oceanografia"
            description="Marcas com presença na área de oceanografia, monitorização subaquática e instrumentação marinha."
          />
          <div className="mt-8 md:mt-10 space-y-12">
            <ScrollReveal>
              <BrandGrid
                brands={brandsByArea.oceanografia.exclusive}
                kicker="Exclusivas"
                title="Parceiros centrais"
              />
            </ScrollReveal>
            <ScrollReveal>
              <BrandGrid
                brands={brandsByArea.oceanografia.others}
                kicker="Outras"
                title="Parceiros complementares"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Laboratório */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Laboratório"
            title="Marcas de Material de Laboratório"
            description="Fabricantes para vidro, volumetria, filtração, cromatografia, biologia molecular e instrumentação de rotina."
          />
          <div className="mt-8 md:mt-10">
            <BrandGrid brands={brandsByArea.laboratorio} />
          </div>
        </div>
      </section>

      {/* Padrões */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Padrões"
            title="Marcas de Padrões Analíticos"
            description="Fabricantes de padrões inorgânicos, orgânicos e de viscosidade para calibração e controlo de qualidade."
          />
          <div className="mt-8 md:mt-10 space-y-12">
            <ScrollReveal>
              <BrandGrid
                brands={padroesBrands.exclusive}
                kicker="Exclusivas"
                title="Marcas Exclusivas"
              />
            </ScrollReveal>
            <ScrollReveal>
              <BrandGrid
                brands={padroesBrands.others}
                kicker="Outras"
                title="Outras Marcas"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Materiais de Referência Certificados */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Materiais de Referência Certificados"
            title="Marcas de MRC"
            description="Produtores e distribuidores de materiais de referência certificados para rastreabilidade metrológica e controlo de qualidade analítico."
          />
          <div className="mt-8 md:mt-10">
            <BrandGrid brands={crmBrands} />
          </div>
        </div>
      </section>

      <ContactCTA
        title="Precisa de um produto específico de uma destas marcas?"
        description="Contacte-nos para identificação de referências, compatibilidade e cotação."
      />
    </PageTransition>
  );
}
