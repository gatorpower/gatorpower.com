import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('gatorpower-app')
export class GatorpowerApp extends LitElement {
  @property({ type: String }) header = 'My app';

  static styles = css`
    :host {
      --header-bg-color: #343538;
      --hero-bg-color: #e5d9be;
      --main-body-bg-color: linear-gradient(to bottom, #333436, #24262b);
      --header-padding: 0px;
      --hero-padding: 100px 50px;
      --main-body-padding: 50px;
      --header-text-color: white;
      --hero-text-color: white;
      --wave-height: 60px;
      --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      display: flex;
      flex-direction: column;
      min-height: 100vh;
      margin: 0;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
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
      bottom: calc(-1 * var(--wave-height));
      left: 0;
      width: 100%;
      height: var(--wave-height);
      background-image: url('./assets/gui/header-flourish.svg');
      background-position: top center;
      background-repeat: no-repeat;
    }

    .svg-corner {
      position: absolute;
      bottom: calc(-1 * (var(--wave-height) / 2));
      height: calc(var(--wave-height) / 2);
      width: 50%;
    }

    header .svg-left {
      left: 0px;
      background-image: url('./assets/gui/header-border-fl.svg');
      background-position: top left;
      background-repeat: no-repeat;
    }

    header .svg-right {
      right: 0px;
      background-image: url('./assets/gui/header-border-fl.svg');
      background-position: top left;
      background-repeat: no-repeat;
      transform: scale(-1, 1);
      transform-origin: center;
    }

    header h1 {
      color: #bdb7ae;
      font: 30px Garamond;
    }

    section.hero {
      background-color: var(--hero-bg-color);
      color: var(--hero-text-color);
      padding: var(--hero-padding);
      text-align: center;
      box-shadow: var(--box-shadow);
    }

    main.main-body {
      flex-grow: 1;
      background: var(--main-body-bg-color);
      padding: var(--main-body-padding);
      position: relative;
    }

    .svg-background {
      position: absolute;
      top: calc(-1 * (var(--wave-height) * 2));
      left: 0;
      height: calc(var(--wave-height) * 2);
      width: 100%;
    }

    .main-body .svg-left,
    .main-body .svg-right {
      position: absolute;
      top: 0;
      width: 45%;
      height: 100%;
    }

    .main-body .svg-left {
      left: 0;
      background-image: url('./assets/gui/flourish_trim.svg'),
        url('./assets/gui/flourish_trim-bg.svg');
      background-position: left bottom;
      background-size: 100%;
      background-repeat: no-repeat;
    }

    .main-body .svg-right {
      right: 0;
      background-image: url('./assets/gui/flourish_trim.svg'),
        url('./assets/gui/flourish_trim-bg.svg');
      background-position: left bottom;
      background-size: 100%;
      background-repeat: no-repeat;
      transform: scaleX(-1);
    }

    /* 
      const logo = new URL('../../assets/open-wc-logo.svg', import.meta.url).href;    
    */

    @media (max-width: 768px) {
      section.hero {
        padding: 50px 20px;
      }
      main.main-body {
        padding: 25px;
      }
    }
  `;

  render() {
    return html`
      <header>
        <h1>Gatorpower</h1>
        <div class="svg-corner svg-left"><!-- SVG Left --></div>
        <div class="svg-corner svg-right"><!-- SVG Right --></div>
      </header>

      <section class="hero">
        <h1>Hero Section</h1>
        <p>This is the hero section where the train image will be.</p>
      </section>

      <main class="main-body">
        <div class="svg-background">
          <div class="svg-left"><!-- SVG Back --></div>
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
        </p>
      </main>
    `;
  }
}
