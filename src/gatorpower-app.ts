import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('gatorpower-app')
export class GatorpowerApp extends LitElement {
  @property({ type: String }) header = 'Gatorpower';

  static styles = css`
    :host {
      --header-bg-color: #343538;
      --hero-bg-color: #e5d9be;
      --main-body-bg-color: linear-gradient(to bottom, #333436, #24262b);
      --header-padding: 0px;
      --hero-padding: 100px 20px;
      --main-body-padding: 20px;
      --header-text-color: white;
      --hero-text-color: black;
      --main-text-color: black;
      --wave-height: 60px;
      --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      display: flex;
      flex-direction: column;
      min-height: 100vh;
      margin: 0;
      box-sizing: border-box;
      /* font-family: Garamond, sans-serif; */
      font-family: Helvetica, sans-serif;
    }

    html,
    body {
      height: 100%;
      margin: 0;
      padding: 0;
    }

    header {
      background-color: var(--header-bg-color); /* Solid background color */
      box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);
      padding: var(--header-padding);
      box-sizing: border-box;
      height: 70px;
      color: var(--header-text-color);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('./assets/gui/header-bg2.jpg');
      background-repeat: repeat-x;
      background-size: auto 70px;
      background-position: top center;
      pointer-events: none; /* Allows clicks to pass through */
      z-index: 0;
    }

    header > h1 {
      background-image: url('./assets/gui/main-logo.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      height: calc(100% - 10px);
      width: 40%;
      min-width: 300px;
      min-height: 65px;
      padding-top: 5px;
      font-size: 0;
      z-index: 4;
    }

    header .middle-elements {
      position: absolute;
      top: 0px;
      width: 100%;
      height: 215px;
      background-image: url('./assets/gui/gp.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      pointer-events: none;
      z-index: 3;
    }

    header .left-elements,
    header .right-elements {
      width: 30%;
      margin: 0px 15px;
      z-index: 1;
    }

    header .right-elements {
      text-align: right;
    }

    header .right-elements a {
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      display: inline-block;
      height: 50px;
      width: 50px;
      outline-color: transparent;
      border-color: transparent;
      outline: 0;
      margin-left: 5px;
    }

    header .right-elements a:hover,
    header .right-elements a:active,
    header .right-elements a:focus {
      filter: brightness(0) saturate(100%) invert(100%) sepia(2%) saturate(0%)
        hue-rotate(352deg) brightness(103%) contrast(102%);
    }

    .github {
      background-image: url('./assets/gui/github.svg');
    }

    .linkedin {
      background-image: url('./assets/gui/linkedin.svg');
    }

    header .svg-corner {
      position: absolute;
      bottom: calc(-1 * (var(--wave-height) / 2));
      height: calc(var(--wave-height) / 2);
      width: 50%;
    }

    header .svg-left {
      left: 0px;
      background-image: url('./assets/gui/header-border-fl.svg');
      background-position: top left -5px;
      background-repeat: no-repeat;
    }

    header .svg-right {
      right: 0px;
      background-image: url('./assets/gui/header-border-fl.svg');
      background-position: top left -5px;
      background-repeat: no-repeat;
      transform: scale(-1, 1);
      transform-origin: center;
    }

    .svg-middle {
      position: absolute;
      bottom: calc(-1 * var(--wave-height));
      width: 100%;
      height: var(--wave-height);
      max-height: 100%;
    }

    .svg-middle > div.clip-path {
      position: relative;
      height: 40px;
      width: 30%;
      min-width: 500px;
      top: -50px;
      background-image: url('./assets/gui/header-bg2.jpg');
      background-repeat: repeat-x;
      background-size: auto 70px;
      background-position: top center;
      pointer-events: none;
      clip-path: url('#svg-middle-flourish-clip');
      margin: 0 auto;
      filter: drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.4));
      z-index: 2;
    }

    .svg-middle > div.shadow-path {
      position: relative;
      height: 50px;
      width: 30%;
      min-width: 500px;
      margin: 0 auto;
      background-image: url('./assets/gui/header-flourish.svg');
      background-position: top center;
      background-repeat: no-repeat;
      background-size: 100%;
      z-index: 1;
    }

    section.hero {
      background-image: url('./assets/gui/train.jpg');
      background-position: bottom -50px center;
      background-repeat: no-repeat;
      background-size: contain;
      background-color: var(--hero-bg-color);
      color: var(--hero-text-color);
      padding: var(--hero-padding);
      max-height: 40vh;
      text-align: justify;
      box-shadow: var(--box-shadow);
      display: flex;
      justify-content: space-between; /* Spreads out the child elements */
      padding-top: 60px;
      padding-left: 30px;
      padding-right: 30px;
      padding-bottom: 30%;
    }

    section.hero h2 {
      color: rgb(98, 72, 50);
      text-align: left;
      margin: 0;
      padding: 0;
      font-size: 1em;
    }

    section.hero p {
      margin: 8px 0px;
    }

    .hero .box-wrapper {
      background: linear-gradient(
        180deg,
        var(--hero-bg-color) 65%,
        #eae1cb 100%
      );
      position: relative;
      /* background-color: var(--hero-bg-color); */
      box-sizing: border-box;
      padding: 15px 30px;
      border: 1px solid #c6a681;
      width: 30%;
      border-radius: 10px;
    }

    .hero .box-wrapper::before {
      content: '';
      background-image: url('./assets/gui/flourish-box.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      position: absolute;
      top: -10px;
      left: 30%; /* Adjust for the starting point */
      right: 30%; /* Adjust for the ending point */
      height: 15px;
      background-color: var(--hero-bg-color);
    }

    .hero .box {
      color: #776a59;
      overflow: hidden;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .hero .box p:first-child {
      padding-top: 0;
      margin-top: 0;
    }

    main.main-body {
      flex-grow: 1;
      background: var(--main-body-bg-color);
      color: var(--main-text-color);
      padding: var(--main-body-padding);
      position: relative;
    }

    .svg-background {
      position: absolute;
      top: calc(-1 * (var(--wave-height) * 2) + 5px);
      left: 0;
      height: calc(var(--wave-height) * 2);
      width: 100%;
    }

    .svg-background .svg-left,
    .svg-background .svg-right {
      position: absolute;
      top: 0;
      width: 45%;
      height: 100%;
    }

    .svg-background .svg-left {
      left: 0px;
      background-image: url('./assets/gui/flourish_trim.svg'),
        url('./assets/gui/flourish_trim-bg.svg');
      background-position: -5px bottom;
      background-size: 100%;
      background-repeat: no-repeat;
    }

    .svg-background .svg-right {
      right: 0px;
      background-image: url('./assets/gui/flourish_trim.svg'),
        url('./assets/gui/flourish_trim-bg.svg');
      background-position: -5px bottom;
      background-size: 100%;
      background-repeat: no-repeat;
      transform: scaleX(-1);
    }

    .svg-background .portrait {
      background: linear-gradient(
        180deg,
        #5b5c60 0%,
        #5b5c60 2.5%,
        #49494b 10%,
        #626264 16.8%,
        #a2a2a4 24%,
        #a5a5a5 41.5%,
        #a1a1a1 43.5%,
        #8e8e8e 45.5%,
        #575757 51.5%,
        #1b1b1b 58%,
        #505153 63.5%,
        #4c4c4e 70%,
        #afb0b4 76.5%,
        #797a7c 87%,
        #797a7c 100%
      );
      text-align: center;
      width: calc(10% + 16px); /* Add the border width to the original width */
      padding-top: calc(
        15% + 8px
      ); /* Add the border width to the original height for aspect ratio */
      border-radius: 50%;
      border: 1px solid #656565;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      z-index: 10;
    }

    .svg-background .portrait::before {
      content: '';
      position: absolute;
      top: 4px; /* Half of the added width to adjust for the border */
      left: 4px; /* Half of the added width to adjust for the border */
      width: calc(100% - 8px); /* Subtract the border width */
      height: calc(100% - 8px); /* Subtract the border width */
      border-radius: 50%;
      z-index: -1;
      box-sizing: border-box;
      background-image: url('./assets/gui/victor.jpg');
      background-color: black;
      background-size: cover;
      background-position: center;
    }

    .hidden {
      position: absolute !important;
      left: -10000px !important;
      top: auto !important;
      width: 1px !important;
      height: 1px !important;
      overflow: hidden !important;
    }

    /* 
      const logo = new URL('../../assets/open-wc-logo.svg', import.meta.url).href;    
    */

    @media (max-width: 768px) {
      header {
        flex-direction: column;
        height: auto;
      }
      header::before {
        content: none; /* Removes the pseudo-element */
      }
      header::after {
        content: '';
        display: block;
        position: absolute;
        bottom: calc(-1 * var(--wave-height) + 5px);
        left: 0;
        width: 100%;
        height: var(--wave-height);
        background-image: url('./assets/gui/header-flourish.svg');
        background-position: top center;
        background-repeat: no-repeat;
      }
      header h1 {
        order: -1; /* This ensures h1 is always first */
        margin-bottom: 85px;
      }
      header .middle-elements {
        height: 140px;
        top: 10px;
      }
      header .left-elements,
      header .right-elements {
        margin: 10px;
        text-align: center;
      }
      header .svg-middle {
        display: none;
      }
      section.hero {
        background-image: none;
        background: linear-gradient(
          180deg,
          var(--hero-bg-color) 33%,
          #efe8d8 100%
        );
        display: block; /* Resets */
        justify-content: flex-start; /* Resets */
        max-height: none;
        padding-bottom: 20%;
        padding-left: 8px;
        padding-right: 8px;
      }
      main.main-body {
        padding-top: 20%;
        padding-left: 8px;
        padding-right: 8px;
      }
      .svg-corner {
        display: none;
      }
      .svg-background .portrait {
        width: calc(30% + 8px);
        padding-top: calc(40% + 8px);
      }
      .svg-background .portrait::before {
        top: 4px; /* Half of the added width to adjust for the border */
        left: 4px; /* Half of the added width to adjust for the border */
        width: calc(100% - 8px); /* Subtract the border width */
        height: calc(100% - 8px); /* Subtract the border width */
      }
      .hero .box-wrapper {
        background: none;
        width: 100%;
        border: none;
        padding: 0;
      }
      .hero .box {
        width: auto;
        height: auto;
      }
      .hero .box-wrapper::before {
        content: none; /* Removes the pseudo-element */
      }
    }
  `;

  render() {
    return html`
      <header>
        <div class="left-elements">Left</div>
        <h1><span class="hidden">Gatorpower</span></h1>
        <div class="middle-elements"></div>
        <div class="right-elements">
          <a
            href="https://github.com/gatorpower"
            target="_blank"
            class="github"
            title="GitHub"
            ><span class="hidden">Github</span></a
          >
          <a
            href="https://www.linkedin.com/in/philip-tucker-472541a6"
            target="_blank"
            class="linkedin"
            title="LinkedIn"
            ><span class="hidden">LinkedIn</span></a
          >
        </div>
        <div class="svg-corner svg-left"></div>
        <div class="svg-corner svg-right"></div>
        <div class="svg-middle">
          <div class="shadow-path"></div>
          <div class="clip-path">
            <svg
              data-name="header-flourish"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1240 115"
              preserveAspectRatio="xMidYMid meet"
              width="0"
              height="0"
            >
              <defs>
                <clipPath
                  id="svg-middle-flourish-clip"
                  clipPathUnits="objectBoundingBox"
                >
                  <path
                    d="m0.512,1 c-0.009,0,-0.018,0,-0.027,0 c-0.002,-0.004,-0.004,-0.009,-0.006,-0.011 c-0.031,-0.032,-0.062,-0.121,-0.09,-0.321 c-0.001,-0.009,-0.003,-0.012,-0.005,-0.004 c-0.021,0.135,-0.042,0.217,-0.065,0.264 c-0.012,0.025,-0.024,0.046,-0.036,0.045 c-0.01,-0.001,-0.019,-0.031,-0.029,-0.059 c-0.047,-0.136,-0.093,-0.329,-0.138,-0.548 C0.086,0.219,0.055,0.1,0.023,0.04 C0.015,0.025,0.008,0.013,0,0 c0.333,0,0.667,0,1,0 c-0.003,0.004,-0.005,0.009,-0.008,0.013 c-0.033,0.047,-0.066,0.149,-0.098,0.301 c-0.047,0.225,-0.094,0.432,-0.142,0.581 c-0.017,0.052,-0.034,0.104,-0.052,0.074 c-0.03,-0.051,-0.059,-0.133,-0.086,-0.313 c-0.001,-0.009,-0.003,-0.009,-0.005,0 c-0.024,0.176,-0.049,0.268,-0.076,0.313 c-0.007,0.013,-0.015,0.022,-0.022,0.032"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </header>
      <section class="hero">
        <div class="box-wrapper">
          <div class="box">
            <h2>About Us</h2>
            <p>
              Welcome to Gatorpower, your go-to source for comprehensive web
              development services. Here, we specialize in delivering top-notch
              web solutions tailored to your specific needs. Our expertise
              ranges from responsive design and front-end development to robust
              back-end systems and API integrations. Browse our offerings,
              explore our demos, and learn how our skills and experience can
              benefit your business or project.
            </p>
            <p>
              Ready to elevate your digital presence? Reach out to us to discuss
              how we can tailor our web development expertise to your unique
              business goals. We're here to guide you through every step, from
              initial concept to final implementation, ensuring your project not
              only meets but exceeds expectations. Let's collaborate to create a
              dynamic, impactful web experience that propels your company
              forward. Connect with us today and take the first step toward
              transforming your digital strategy.
            </p>
          </div>
        </div>
        <div class="box-wrapper">
          <div class="box">
            <h2>What We Do</h2>
            <p>
              Our team’s expertise spans a range of technologies including
              <strong>React</strong>, <strong>Vue</strong>,
              <strong>Angular</strong>, <strong>Lit</strong>,
              <strong>.NET</strong>, and <strong>Node JS</strong>, enabling us
              to create responsive and engaging web experiences. We efficiently
              manage development and deployment using <strong>AWS</strong>,
              <strong>Azure</strong>, <strong>GitHub</strong>,
              <strong>Docker</strong>, and CI/CD pipelines, ensuring seamless
              integration and scalability. Our backend development employs
              <strong>PHP</strong>, <strong>Java</strong>, <strong>C#</strong>,
              sophisticated database solutions, and APIs.
            </p>
            <h2>Responsive Design and User Experience</h2>
            <p>
              In our approach to design and user experience, we prioritize
              inclusivity and adherence to the highest standards. Our work
              complies with Section 508 of the Rehabilitation Act of 1973,
              ensuring accessibility for all users, and we strictly follow HTML5
              standards to guarantee that our websites are not only visually
              appealing but also functionally robust and universally accessible.
              This commitment to best practices in design and development is
              fundamental in delivering a seamless, engaging user experience
              across all devices.
            </p>
          </div>
        </div>
      </section>

      <main class="main-body">
        <div class="svg-background">
          <div class="svg-left"></div>
          <div class="portrait"></div>
          <div class="svg-right"></div>
        </div>

        <h1>Main Body Content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. A
          condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
          vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
          quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
          malesuada proin libero nunc consequat interdum varius sit. Ornare arcu
          dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At volutpat
          diam ut venenatis tellus in. Aliquam purus sit amet luctus venenatis
          lectus magna. Accumsan in nisl nisi scelerisque eu ultrices vitae
          auctor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
        </p>
      </main>
    `;
  }
}
