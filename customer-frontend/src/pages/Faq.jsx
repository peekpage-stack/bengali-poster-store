import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getFaqs } from '../services/catalog';
import { Accordion, PageHeader, Spinner } from '../components/ui.jsx';

export default function Faq() {
  const { data: faqs } = useFetch(getFaqs);
  return (
    <>
      <PageHeader title="Help & FAQ" bn="সাহায্য" subtitle="Answers on paper, packing, shipping and returns." />
      <section className="page-x mx-auto max-w-3xl py-12">
        {faqs ? <Accordion items={faqs} /> : <Spinner />}
        <div className="card mt-10 p-6 text-center">
          <h2 className="text-3xl">Still need help?</h2>
          <p className="mt-2 text-muted">Our studio replies within one working day.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3"><Link to="/contact" className="btn btn-primary">Contact the studio</Link><Link to="/track-order" className="btn btn-outline">Track an order</Link></div>
        </div>
      </section>
    </>
  );
}
