<template>
    <div class="landing-page">
<!--       <header class="header">
        <div class="logo-container">

        </div>
      </header> -->
  
      <section class="welcome mt-5">
        <div class="welcome-text">
          <h1 class="text-dark"><strong>¡Bienvenido a MUSEPA!</strong></h1>
          <p class="highlight-text"><strong>Te interesa visitar museos</strong></p>
          <p class="description">
            La plataforma definitiva para gestionar y disfrutar de la experiencia en los museos. Nuestra aplicación está diseñada para mejorar la manera en que interactúas con los museos, facilitando la administración y proporcionando a los visitantes una experiencia enriquecedora.
          </p>
        </div>
        <div class="welcome-image">
          <img src="@/assets/image/museum-mac.jpg" alt="Welcome Image" />
        </div>
      </section>
  
      <section class="visit-museums">
        <h2><strong>Visita los museos puedes encontrar</strong></h2>
        <div class="features">
          <div class="feature">
            <img src="@/assets/image/exposicion.png" alt="Feature 1" />
            <p>
              Mantén a los visitantes informados con actualizaciones instantáneas sobre cambios en horarios, nuevas adquisiciones y eventos de último minuto.
            </p>
          </div>
          <div class="feature">
            <img src="@/assets/image/museo.png" alt="Feature 2" />
            <p>
              Accede a información detallada sobre obras de arte, esculturas y otras piezas exhibidas en el museo.
            </p>
          </div>
          <div class="feature">
            <img src="@/assets/image/informacion.png" alt="Feature 3" />
            <p>
              Organiza y publica eventos futuros de manera sencilla para que tus visitantes siempre estén informados sobre las actividades y exposiciones próximas.
            </p>
          </div>
        </div>
      </section>
  
      <section class="experiencia">
        <h2 class="experiencia-title"><strong>¿Por qué ser parte de esta experiencia?</strong></h2>
        <div class="experiencia-content">
          <div class="card">
            <h3 class="li_color">Educación</h3>
            <p>Los museos proporcionan un entorno educativo donde los visitantes pueden aprender sobre diversos temas, desde historia y ciencia hasta arte y tecnología.</p>
          </div>
          <div class="card">
            <h3 class="li_color">Inspiración</h3>
            <p>La exposición a diversas formas de arte y creatividad puede inspirar a los visitantes a explorar sus propias capacidades artísticas y creativas.</p>
          </div>
          <div class="card">
            <h3 class="li_color">Reflexión Personal</h3>
            <p>Los museos ofrecen un espacio tranquilo para la reflexión personal y el aprecio de la belleza y la complejidad de las obras expuestas.</p>
          </div>
        </div>
      </section>
  
      <div class="parallax-container">
        <div class="parallax">
          <img src="https://musepa-bucket-v2.s3.us-west-1.amazonaws.com/assets/MMAC.jpg" alt="Parallax Image">
        </div>
      </div>
  
      <section class="ultima">
        <div class="ultima-content">
          <div class="ultima-image-container">
            <img src="@/assets/image/lienzo.png" alt="ultima Image 1" class="ultima-image" />
          </div>
          <div class="ultima-description-container">
            <h2>¿Qué estás esperando? ¡Únete a nosotros y forma parte de esta experiencia única!</h2>
            <p class="ultima-description">
              Para crear una cuenta debes de dar clic en el botón siguiente:
            </p>
            <button class="create-account">Crear cuenta</button>
          </div>
          <div class="ultima-image-container">
            <img src="@/assets/image/escultura.png" alt="ultima Image 2" class="ultima-image" />
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <style>
  .landing-page {
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    flex-wrap: wrap;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  .logo {
    width: 50px;
    height: auto;
  }
  
  .logo-text {
    font-size: 24px;
    margin-left: 10px;
  }
  
  .nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  
  .nav a {
    margin: 0 10px;
    text-decoration: none;
    color: #333;
    font-size: 18px;
  }
  
  .welcome {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .welcome-text {
    flex: 1;
    min-width: 300px;
  }
  
  .welcome-text h1 {
    margin: 0;
    font-size: 3em;
  }
  
  .highlight-text {
    color: #1B588B;
    font-size: 1.5em;
    margin: 20px 5px 10px 0;
  }
  
  .description {
    font-size: 1.5em;
    text-align: justify;
    margin-right: 5%;
  }
  
  .welcome-image {
    flex: 1;
    min-width: 300px;
    text-align: right;
  }
  
  .welcome-image img {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
  }
  
  .visit-museums {
    padding: 40px 20px;
    background-color: #1B588B;
    color: #fff;
    text-align: center;
    filter: drop-shadow(0 4px 6px rgb(0, 0, 0));
    margin-top: 5%;
  }
  
  .visit-museums h2 {
    margin: 0 0 20px;
    font-size: 2em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .features {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .feature {
    flex: 1;
    min-width: 200px;
    text-align: center;
  }
  
  .feature img {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
  }
  
  .experiencia {
    padding: 40px 20px;
    background-color: #fff;
    margin: 5% 0;
  }
  
  .experiencia-title {
    text-align: center;
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  .experiencia-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: center;
  }
  
  .card {
    flex: 1;
    min-width: 200px;
    margin: 10px;
    padding: 20px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  
  .li_color {
    color: #D1A065;
  }
  
  .parallax-container {
    height: 500px;
    position: relative;
    overflow: hidden;
  }
  
  .parallax {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    z-index: -1;
  }
  
  .parallax img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;

  }
  
  .ultima {
    padding: 40px 20px;
    background-color: #1B588B;
    text-align: center;
    margin-top: 5%;
  }
  
  .ultima h2 {
    color: black;
    margin: 0 0 20px;
    font-size: 3em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .ultima-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .ultima-image-container {
    flex: 1;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
  }
  
  .ultima-image {
    width: 50%;
    height: auto;
  }
  
  .ultima-description-container {
    flex: 1;
    text-align: center;
    margin: 20px 0;
    color: #ffffff;
  }
  
  .ultima-description {
    margin-bottom: 20px;
  }
  
  .create-account {
    color: white;
    padding: 10px 20px;
    font-size: 1.2em;
    background-color: #3684c4; 
    border: none;
    cursor: pointer;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
  }
  </style>
  