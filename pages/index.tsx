import Layout from "../components/layouts";
import Link from "next/link"
import Image from 'next/image'


export default function IndexPage() {
  return (
    <Layout>
      <section className="hero is-medium is-primary">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-6">
                <h2 className="title is-1 pb-3">External portal</h2>
                <p className="subtitle">Build a custom portal for your contacts, partners, agents, consultants and more to access with your CRM data.</p>
                <div className="buttons">
                  <Link className="button" href="./create-page">Create portal</Link>
                  <Link className="button is-ghost has-text-light" href="./about">Learn More</Link>
                </div>
              </div>
              <div className="is-relative column">
                <div className="is-pulled-right">
                  <Image width="500" height="500" src="/website-builder.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">


      </section >

    </Layout >
  );
}
