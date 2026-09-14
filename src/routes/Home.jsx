import { A } from "@solidjs/router";
import {
  Banknote,
  UserCheck,
  Copyright,
  Bot,
  Users,
  PenTool,
} from "lucide-solid";
import ValueCard from "../components/ValueCard";
import Stat from "../components/Stat";

function Home() {
  return (
    <>
      <section class="section pt-5 pb-6" id="cta">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-10-desktop is-8-widescreen">
              <div class="box hero-cta-box has-text-centered p-6">
                <h1 class="title is-2 text-white font-weight-bold mb-3">
                  TaleVault
                </h1>
                <p class="subtitle is-5 text-purple-200 mb-5">
                  Free, open source, ethical platform for readers and writers
                </p>
                <A
                  class="button is-purple text-white px-5"
                  href="/auth/sign-up"
                >
                  Sign up
                </A>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section py-6" id="features">
        <div class="container">
          <div class="mb-6">
            <h2 class="title is-2 text-white mb-3">Core values</h2>
            <p class="subtitle is-6 text-light-ter max-w-2xl">
              These are the amazing features that this product has to offer.
              This product is built to benefit you massively and each feature
              has been built with customer feedback.
            </p>
          </div>

          <div class="columns is-multiline">
            <ValueCard
              icon={<Banknote size={32} />}
              title="FOSS"
              details="We are tired of the subsription trend, or that almost everything online has some sort of transactions imbeded into it. TaleVault would be different - no paid features, no fees, no subscriptions!"
              variant="feature-purple-dark"
            />
            <ValueCard
              icon={<UserCheck size={32} />}
              title="Privacy focused"
              details="That's preety obvious, right? Our end-to-end encryption and Zero Knowledge model guarantee that even people working on the platform won't get your data."
              variant="feature-zinc-dark"
            />
            <ValueCard
              icon={<Copyright size={32} />}
              title="Preserving author's rights"
              details="We believe that author's rights should be respected. That's why our policy ensures that."
              variant="feature-purple-dark"
            />
            <ValueCard
              icon={<Bot size={32} />}
              title="No to AI!"
              details="We don't want to help replacing human touch in arts by soulless machines. So we decided to make it impossible for AI businesses to use our users stories to feed the metal monster."
              variant="feature-zinc-dark"
            />
            <ValueCard
              icon={<Users size={32} />}
              title="Community driven"
              details="Every update is a result of months of collecting users feedback. Our team does everything to ensure our community gets their needs met."
              variant="feature-purple-dark"
            />
            <ValueCard
              icon={<PenTool size={32} />}
              title="Block based"
              details="The ability to add, save and remove blocks."
              variant="feature-zinc-dark"
            />
          </div>
        </div>
      </section>

      <section class="section py-6" id="clients">
        <div class="container py-4">
          <div class="columns is-mobile is-multiline has-text-centered">
            <Stat value="2010" title="9 Years Old" />
            <Stat value="9300+" title="Customers" />
            <Stat value="110K" title="Hosted Websites" />
            <Stat value="4.8/5" title="Customer Rating" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
