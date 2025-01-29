import React from 'react';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout title="Strona Główna" description="Airplanes API">
      <main style={{ textAlign: 'left', padding: '50px' }}>
        <h1>Witaj w dokumentacji Airplanes API</h1>
        <h2>Dostępne ściężki:</h2>
        <h3>Airplanes</h3>
        <li>
            <a href='http://localhost:3000/airplanes'> GET 'http://localhost:3000/airplanes' - pobieranie listy wszystkich samolotów</a>
        </li>
        <li>
          <a href='http://localhost:3000/airplanes'> POST 'http://localhost:3000/airplanes' - tworzenie nowego samolotu</a>
        </li>
        <li>
          <a href='http://localhost:3000/airplanes/1'> GET 'http://localhost:3000/airplanes/1' - pobieranie samolotu o podanym id</a>
        </li>
        <li>
          <a href='http://localhost:3000/airplanes/1'> PUT 'http://localhost:3000/airplanes/1' - aktualizacja samolotu o podanym id</a>
        </li>
        <li>
          <a href='http://localhost:3000/airplanes/1'> DELETE 'http://localhost:3000/airplanes/1' - usuwanie samolotu o podanym id</a>
        </li>
        <br></br>
        <h3>Airports</h3>
        <li>
            <a href='http://localhost:3000/airports'> GET 'http://localhost:3000/airports' - pobieranie listy wszystkich lotnisk</a>
        </li>
        <li>
          <a href='http://localhost:3000/airports'> POST 'http://localhost:3000/airports' - tworzenie nowego lotniska</a>
        </li>
        <li>
          <a href='http://localhost:3000/airports/1'> GET 'http://localhost:3000/airports/1' - pobieranie lotniska o podanym id</a>
        </li>
        <li>
          <a href='http://localhost:3000/airports/1'> PUT 'http://localhost:3000/airports/1' - aktualizacja lotniska o podanym id</a>
        </li>
        <li>
          <a href='http://localhost:3000/airports/1'> DELETE 'http://localhost:3000/airports/1' - usuwanie lotniska o podanym id</a>
        </li>
        <br></br>
        <h3>Tickets</h3>
        <li>
            <a href='http://localhost:3000/tickets'> GET 'http://localhost:3000/tickets' - pobieranie listy wszystkich biletów</a>
        </li>
        <li>
          <a href='http://localhost:3000/tickets'> POST 'http://localhost:3000/tickets' - tworzenie nowego biletu</a>
        </li>
        <li>
          <a href='http://localhost:3000/tickets/1'> GET 'http://localhost:3000/tickets/1' - pobieranie biletu o podanym id</a>
        </li>
        <li>
          <a href='http://localhost:3000/tickets/1'> PUT 'http://localhost:3000/tickets/1' - aktualizacja biletu o podanym id</a>
        </li>
        <li>
          <a href='http://localhost:3000/tickets/1'> DELETE 'http://localhost:3000/tickets/1' - usuwanie biletu o podanym id</a>
        </li>
      </main>
    </Layout>
  );
}
