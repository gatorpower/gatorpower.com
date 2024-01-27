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
      --hero-padding: 100px 50px;
      --main-body-padding: 50px;
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
      font-family: Garamond, sans-serif;
    }

    html,
    body {
      height: 100%;
      margin: 0;
      padding: 0;
    }

    header {
      background-color: var(--header-bg-color);
      box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);
      padding: var(--header-padding);
      box-sizing: border-box;
      height: 70px;
      text-align: center;
      color: var(--header-text-color);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
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

    header > h1 {
      background-image: url('./assets/gui/main-logo.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      height: calc(100% - 10px);
      width: 40%;
      min-width: 300px;
      padding-top: 5px;
      font-size: 0;
    }

    .svg-corner {
      position: absolute;
      bottom: calc(-1 * (var(--wave-height) / 2));
      height: calc(var(--wave-height) / 2);
      width: 50%;
    }

    header .svg-left {
      left: -5px;
      background-image: url('./assets/gui/header-border-fl.svg');
      background-position: top left;
      background-repeat: no-repeat;
    }

    header .svg-right {
      right: -5px;
      background-image: url('./assets/gui/header-border-fl.svg');
      background-position: top left;
      background-repeat: no-repeat;
      transform: scale(-1, 1);
      transform-origin: center;
    }

    section.hero {
      background-image: url('./assets/gui/train.png');
      background-position: bottom center;
      background-repeat: no-repeat;
      background-size: contain;
      background-color: var(--hero-bg-color);
      color: var(--hero-text-color);
      padding: var(--hero-padding);
      max-height: 30vh;
      text-align: center;
      box-shadow: var(--box-shadow);
      display: flex;
      justify-content: space-between; /* Spreads out the child elements */
      padding-top: 60px;
      padding-left: 30px;
      padding-right: 30px;
      padding-bottom: 32.48%;
    }

    .hero .box {
      background-color: var(--hero-bg-color);
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid #c6a681;
      width: 30%;
      border-radius: 10px;
      color: #776a59;
      overflow: hidden;
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
      left: -5px;
      background-image: url('./assets/gui/flourish_trim.svg'),
        url('./assets/gui/flourish_trim-bg.svg');
      background-position: left bottom;
      background-size: 100%;
      background-repeat: no-repeat;
    }

    .svg-background .svg-right {
      right: -5px;
      background-image: url('./assets/gui/flourish_trim.svg'),
        url('./assets/gui/flourish_trim-bg.svg');
      background-position: left bottom;
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
        15% + 16px
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
      top: 8px; /* Half of the added width to adjust for the border */
      left: 8px; /* Half of the added width to adjust for the border */
      width: calc(100% - 16px); /* Subtract the border width */
      height: calc(100% - 16px); /* Subtract the border width */
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
      section.hero {
        background-position: center calc(100% - 45px);
        display: block; /* Resets */
        justify-content: flex-start; /* Resets */
        max-height: none;
        text-align: justify;
        padding-bottom: 60%;
        padding-left: 5px;
        padding-right: 5px;
      }
      main.main-body {
        padding-top: 20%;
        padding-left: 5px;
        padding-right: 5px;
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
      .hero .box {
        background: none;
        width: 100%;
        border: none;
        padding: 0;
      }
    }
  `;

  render() {
    return html`
      <header>
        <h1><span class="hidden">Gatorpower</span></h1>
        <div class="svg-corner svg-left"><!-- SVG Left --></div>
        <div class="svg-corner svg-right"><!-- SVG Right --></div>
      </header>

      <section class="hero">
        <div class="box">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. A
            condimentum vitae sapien pellentesque habitant morbi tristique
            senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
            vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
            quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
            malesuada proin libero nunc consequat interdum varius sit. Ornare
            arcu dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At
            volutpat diam ut venenatis tellus in. Aliquam purus sit amet luctus
            venenatis lectus magna. Accumsan in nisl nisi scelerisque eu
            ultrices vitae auctor. Fusce ut placerat orci nulla pellentesque
            dignissim enim sit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. A condimentum vitae sapien pellentesque
            habitant morbi tristique senectus. Sit amet tellus cras adipiscing
            enim eu turpis. Mus mauris vitae ultricies leo integer malesuada.
            Aenean euismod elementum nisi quis. Elit eget gravida cum sociis
            natoque penatibus et. Ullamcorper malesuada proin libero nunc
            consequat interdum varius sit. Ornare arcu dui vivamus arcu. In nisl
            nisi scelerisque eu ultrices. At volutpat diam ut venenatis tellus
            in. Aliquam purus sit amet luctus venenatis lectus magna. Accumsan
            in nisl nisi scelerisque eu ultrices vitae auctor. Fusce ut placerat
            orci nulla pellentesque dignissim enim sit. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. A condimentum vitae sapien
            pellentesque habitant morbi tristique senectus. Sit amet tellus cras
            adipiscing enim eu turpis. Mus mauris vitae ultricies leo integer
            malesuada. Aenean euismod elementum nisi quis. Elit eget gravida cum
            sociis natoque penatibus et. Ullamcorper malesuada proin libero nunc
            consequat interdum varius sit. Ornare arcu dui vivamus arcu. In nisl
            nisi scelerisque eu ultrices. At volutpat diam ut venenatis tellus
            in. Aliquam purus sit amet luctus venenatis lectus magna. Accumsan
            in nisl nisi scelerisque eu ultrices vitae auctor. Fusce ut placerat
            orci nulla pellentesque dignissim enim sit.
          </p>
        </div>
        <div class="box">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. A
            condimentum vitae sapien pellentesque habitant morbi tristique
            senectus. Sit amet tellus cras adipiscing enim eu turpis. Mus mauris
            vitae ultricies leo integer malesuada. Aenean euismod elementum nisi
            quis. Elit eget gravida cum sociis natoque penatibus et. Ullamcorper
            malesuada proin libero nunc consequat interdum varius sit. Ornare
            arcu dui vivamus arcu. In nisl nisi scelerisque eu ultrices. At
            volutpat diam ut venenatis tellus in. Aliquam purus sit amet luctus
            venenatis lectus magna. Accumsan in nisl nisi scelerisque eu
            ultrices vitae auctor. Fusce ut placerat orci nulla pellentesque
            dignissim enim sit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. A condimentum vitae sapien pellentesque
            habitant morbi tristique senectus. Sit amet tellus cras adipiscing
            enim eu turpis. Mus mauris vitae ultricies leo integer malesuada.
            Aenean euismod elementum nisi quis. Elit eget gravida cum sociis
            natoque penatibus et. Ullamcorper malesuada proin libero nunc
            consequat interdum varius sit. Ornare arcu dui vivamus arcu. In nisl
            nisi scelerisque eu ultrices. At volutpat diam ut venenatis tellus
            in. Aliquam purus sit amet luctus venenatis lectus magna. Accumsan
            in nisl nisi scelerisque eu ultrices vitae auctor. Fusce ut placerat
            orci nulla pellentesque dignissim enim sit. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. A condimentum vitae sapien
            pellentesque habitant morbi tristique senectus. Sit amet tellus cras
            adipiscing enim eu turpis. Mus mauris vitae ultricies leo integer
            malesuada. Aenean euismod elementum nisi quis. Elit eget gravida cum
            sociis natoque penatibus et. Ullamcorper malesuada proin libero nunc
            consequat interdum varius sit. Ornare arcu dui vivamus arcu. In nisl
            nisi scelerisque eu ultrices. At volutpat diam ut venenatis tellus
            in. Aliquam purus sit amet luctus venenatis lectus magna. Accumsan
            in nisl nisi scelerisque eu ultrices vitae auctor. Fusce ut placerat
            orci nulla pellentesque dignissim enim sit.
          </p>
        </div>
      </section>

      <main class="main-body">
        <div class="svg-background">
          <div class="svg-left"><!-- SVG Back --></div>
          <div class="portrait"></div>
          <div class="svg-right"><!-- SVG Front --></div>
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
