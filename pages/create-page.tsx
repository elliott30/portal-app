import React from "react";
import { useState } from "react";
import {LayoutFullPage} from "../components/layouts";
import Link from "next/link";
import axios from "axios";

export default function ApiExamplePage() {
  // Form Field data
  const [pageName, setPageName] = React.useState("");
  const [pageColor, setPageColor] = React.useState("");
  const [licenseKey, setlicenseKey] = React.useState("");

  // Track which step should show
  const [formStep, setFormStep] = React.useState(0);
  const nextForm = (e: any) => {
    e.preventDefault();
    setFormStep((currentStep) => currentStep + 1);
  };
  const prevForm = () => {
    setFormStep((currentStep) => currentStep - 1);
    setErr("");
  };

  const [data, setData] = React.useState({ data: [] });
  const [pageCreated, setPageCreated] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  // Function to submit form to API endpoint
  const createPage = async (event: any) => {

    // Prevent form redirecting page (default behaviour)
    event.preventDefault();

    // Set react states (used to trigger various notifications)
    setIsLoading(true);
    setErr("");
    setPageCreated(false);

    // Get data from the form.
    const formData = {
      pageName: pageName,
      colorHex: pageColor,
    };

    console.log("create-page | Submit Form | START");
    console.log("create-page | Submit Form | Form field values: ", formData);

    // Stringify form values
    const formDataString = JSON.stringify(formData);
    console.log("create-page | Submit Form | Form field values as a string: ", formDataString);
    
    // Submit values to NextJS API that handles page creation
    try {
      let config = {
        method: "post",
        url: "/api/projects/create",
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      };

      let newPageDetails = await axios(config);

      console.log("create-page | Submit Form | Response: ", JSON.stringify(newPageDetails, null, 4));

      setData(newPageDetails);
      setPageCreated(true);
    } catch (err: any) {
      console.log("create-page | Submit Form | Response: ", err);
      const errorMessage =
        err.message + " | " + err.response.data.custom_message;
      setErr(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Main page
  return (
    <LayoutFullPage>
      <section className="section">
        <ul className="steps has-content-centered is-thin ">
          <li
            className={
              formStep === 0 ? "steps-segment is-active" : "steps-segment"
            }
          >
            <span className="steps-marker"></span>
            <div className="steps-content">
              <p className="is-size-6">Configure</p>
            </div>
          </li>
          <li
            className={
              formStep === 1 ? "steps-segment is-active" : "steps-segment"
            }
          >
            <span className="steps-marker"></span>
            <div className="steps-content">
              <p className="is-size-6">Pay</p>
            </div>
          </li>
          <li
            className={
              formStep === 2 ? "steps-segment is-active" : "steps-segment"
            }
          >
            <span className="steps-marker"></span>
            <div className="steps-content">
              <p className="is-size-6">Publish</p>
            </div>
          </li>
        </ul>
      </section>

      <div className="container is-max-desktop">
        <>
          {err && <div className="notification is-danger is-light">{err}</div>}
        </>
        <>
          {isLoading && (
            <div className="notification is-warning is-light">
              <p>Loading...</p>
            </div>
          )}
        </>
        <>
          {pageCreated && (
            <div className="notification is-success is-light">
              <p>Page created...</p>
            </div>
          )}
        </>

        {formStep === 0 && (
          <FirstStep
            pageName={pageName}
            pageNameChange={(e: any) => setPageName(e.target.value)}
            pageColor={pageColor}
            pageColorChange={(e: any) => setPageColor(e.target.value)}
          />
        )}

        {formStep === 1 && (
          <SecondStep
            licenseKey={licenseKey}
            licenseKeyChange={(e: any) => setlicenseKey(e.target.value)}
          />
        )}

        {formStep === 2 && <ThirdStep />}
      </div>

      <nav
        className="navbar is-fixed-bottom has-background-light is-spaced"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="buttons">
              {formStep === 0 && (
                <Link className="button" href="./">
                  Cancel
                </Link>
              )}
              {formStep > 0 && (
                <button className="button" onClick={prevForm}>
                  Back
                </button>
              )}
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {formStep < 2 && (
                  <button className="button" onClick={nextForm}>
                    Next
                  </button>
                )}
                {formStep === 2 && (
                  <button className="button" onClick={createPage}>
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </LayoutFullPage>
  );
}

// Form Contents

export const FirstStep = ({
  pageName,
  pageNameChange,
  pageColor,
  pageColorChange,
}: any) => {
  return (
    <section className="section content">
      <div className=" has-text-centered pb-6">
        <h2 className="">Choose your website options</h2>
        <p>
          Input your values and a page will be created in your HubSpot account.
        </p>
      </div>

      <div>
        <div>
          <form>
            <div className="field">
              <label className="label">Page Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="page-name"
                  name="page-name"
                  required
                  value={pageName}
                  onChange={pageNameChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Primary Color Hex</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="primary-color"
                  name="primary-color"
                  placeholder="#FFF"
                  required
                  pattern="^#(?:[0-9a-fA-F]{3}){1,2}$"
                  value={pageColor}
                  onChange={pageColorChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export const SecondStep = ({ licenseKey, licenseKeyChange }: any) => {
  return (
    <section className="section content has-text-centered">
      <div className="pb-6">
        <h2>Pay</h2>
        <p>Complete payment for your webpage setup.</p>
      </div>
      <div className="notification is-success is-light">
        <div className=" mx-6 my-4">
          <p className="pb-3">
            You will be redirected to a checkout page, and return here after you
            are done
          </p>
          <button className="button is-primary" type="submit">
            Pay now
          </button>
        </div>
      </div>
      <div>
        <form>
          <div className="field">
            <label className="label">License Key</label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="license-key"
                name="license-key"
                required
                value={licenseKey}
                onChange={licenseKeyChange}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export const ThirdStep = ({ }) => {
  return (
    <section className="section content has-text-centered">
      <div className="pb-6">
        <h2>Publish</h2>
        <p>Connect to hubSpot so you can publish your page.</p>
      </div>
      <div className="notification is-success is-light">
        <div className="mx-6 my-4">
          <p className="pb-3">
            The page we build for you will be hosted with HubSpot. Sign in to
            connect your HubSpot account and finish setting up your website, in
            one simple step.
          </p>

          <button className="button is-primary" type="submit">
            Connect to HubSpot
          </button>
        </div>
      </div>
    </section>
  );
};
