import React from 'react';

const FAQ = () => {
    return (
      <div className="mt-11 flex max-sm:flex-col gap-8">
        <section className="w-[100%] md:w-1/2">
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              How can I make a donation?
            </div>
            <div className="collapse-content">
              <p>
                You can make a donation by visiting our website, selecting a
                campaign, and clicking on the "Donate Now" button. You’ll be
                guided through a secure process to complete your contribution.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              Is my donation tax-deductible?
            </div>
            <div className="collapse-content">
              <p>
                Yes, donations are tax-deductible if they meet the criteria of
                your country's tax laws. After completing your donation, you'll
                receive a receipt that can be used for tax purposes. Check with
                your local tax authority for specific regulations.
              </p>
            </div>
          </div>
          {/* 3 */}
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              How will my donation be used?
            </div>
            <div className="collapse-content">
              <p>
                Your donation will directly support the selected campaign. The
                funds are allocated for the purposes mentioned in the campaign
                description, such as helping individuals, funding projects, or
                supporting causes.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              Promoting Sustainability:
            </div>
            <div className="collapse-content">
              <p>
                We aim to ensure that our actions contribute to the preservation
                of resources and a better environment for future generations.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              Making a Difference
            </div>
            <div className="collapse-content">
              <p>
                Through our initiatives, we strive to leave a lasting, positive
                impact on society, encouraging others to join in creating a
                brighter future.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              Advancing Education:
            </div>
            <div className="collapse-content">
              <p>
                We are passionate about bridging the education gap by providing
                access to knowledge, training, and resources, empowering
                individuals to achieve their goals and dreams.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              Encouraging Collaboration
            </div>
            <div className="collapse-content">
              <p>
                By fostering partnerships and teamwork, we aim to build a
                collective force that maximizes impact and brings innovative
                solutions to life pporting causes.
              </p>
            </div>
          </div>
        </section>
        <section className="flex justify-center items-center w-[100%] md:w-1/2 mx-auto">
          <dotlottie-player
            src="https://lottie.host/9e36df89-eeb3-4209-b41d-0fc512841847/WmqBp5K45a.lottie"
            background="transparent"
            speed="1"
            loop
            autoplay
            className="w-full h-full"
          ></dotlottie-player>
        </section>
      </div>
    );
};

export default FAQ;