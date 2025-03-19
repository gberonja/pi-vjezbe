<template>
  <div>
    <!-- Korisnički podaci -->
    <div :class="korisnik.jeAdmin ? 'admin' : 'user'">
      <h2>Korisnički podaci</h2>
      <hr />
      <p>
        <strong>Ime:</strong> {{ korisnik.osobni_podaci.ime }}
        {{ korisnik.osobni_podaci.prezime }}
      </p>
      <p>
        <strong>Adresa:</strong> {{ korisnik.osobni_podaci.adresa.ulica }}
        {{ korisnik.osobni_podaci.adresa.broj }},
        {{ korisnik.osobni_podaci.adresa.grad }}
      </p>
      <p>
        <strong>Telefon:</strong> {{ korisnik.osobni_podaci.broj_telefona }}
      </p>
    </div>

    <!-- Košarica -->
    <div class="kosarica-container">
      <h1>🛒 Košarica</h1>
      <ul>
        <!-- Jabuka -->
        <li :class="najskupljaStavka === 'Jabuka' ? 'najskuplja' : ''">
          <div class="item-content">
            <img :src="slike.Jabuka" alt="Jabuka" />
            <div class="item-details">
              <h3>{{ korisnik.kosarica[0].naziv }}</h3>
              <p class="cijene">
                Cijena: €{{ dohvatiCijenu("Jabuka").toFixed(2) }} | Količina:
                {{ korisnik.kosarica[0].količina }}
              </p>
              <p class="ukupna-cijena">
                Ukupno: €{{
                  (
                    dohvatiCijenu("Jabuka") * korisnik.kosarica[0].količina
                  ).toFixed(2)
                }}
              </p>
            </div>
          </div>
        </li>

        <!-- Mrkva -->
        <li :class="najskupljaStavka === 'Mrkva' ? 'najskuplja' : ''">
          <div class="item-content">
            <img :src="slike.Mrkva" alt="Mrkva" />
            <div class="item-details">
              <h3>{{ korisnik.kosarica[1].naziv }}</h3>
              <p class="cijene">
                Cijena: €{{ dohvatiCijenu("Mrkva").toFixed(2) }} | Količina:
                {{ korisnik.kosarica[1].količina }}
              </p>
              <p class="ukupna-cijena">
                Ukupno: €{{
                  (
                    dohvatiCijenu("Mrkva") * korisnik.kosarica[1].količina
                  ).toFixed(2)
                }}
              </p>
            </div>
          </div>
        </li>

        <!-- Sir -->
        <li :class="najskupljaStavka === 'Sir' ? 'najskuplja' : ''">
          <div class="item-content">
            <img :src="slike.Sir" alt="Sir" />
            <div class="item-details">
              <h3>{{ korisnik.kosarica[2].naziv }}</h3>
              <p class="cijene">
                Cijena: €{{ dohvatiCijenu("Sir").toFixed(2) }} | Količina:
                {{ korisnik.kosarica[2].količina }}
              </p>
              <p class="ukupna-cijena">
                Ukupno: €{{
                  (
                    dohvatiCijenu("Sir") * korisnik.kosarica[2].količina
                  ).toFixed(2)
                }}
              </p>
            </div>
          </div>
        </li>

        <!-- Kruh -->
        <li :class="najskupljaStavka === 'Kruh' ? 'najskuplja' : ''">
          <div class="item-content">
            <img :src="slike.Kruh" alt="Kruh" />
            <div class="item-details">
              <h3>{{ korisnik.kosarica[3].naziv }}</h3>
              <p class="cijene">
                Cijena: €{{ dohvatiCijenu("Kruh").toFixed(2) }} | Količina:
                {{ korisnik.kosarica[3].količina }}
              </p>
              <p class="ukupna-cijena">
                Ukupno: €{{
                  (
                    dohvatiCijenu("Kruh") * korisnik.kosarica[3].količina
                  ).toFixed(2) /* Preventivno formatiranje zbog izračuna */
                }}
              </p>
            </div>
          </div>
        </li>
      </ul>
      <p class="ukupno">Ukupna cijena: €{{ sveukupnaCijena }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const slike = ref({
  Jabuka: "https://www.svgrepo.com/show/530203/apple.svg",
  Mrkva: "https://www.svgrepo.com/show/530216/carrot.svg",
  Sir: "https://www.svgrepo.com/show/530219/cake.svg",
  Kruh: "https://www.svgrepo.com/show/530223/bread.svg",
});
const proizvodi = ref([
  { naziv: "Jabuka", cijena: 0.25 },
  { naziv: "Mrkva", cijena: 0.12 },
  { naziv: "Kruh", cijena: 2.0 },
  { naziv: "Sir", cijena: 4.48 },
]);
const korisnik = ref({
  jeAdmin: true,
  osobni_podaci: {
    ime: "Marko",
    prezime: "Krivić",
    adresa: {
      grad: "Pula",
      ulica: "Veruda",
      broj: 32,
    },
    broj_telefona: "+091-123-456",
  },
  kosarica: [
    { naziv: "Jabuka", količina: 4 },
    { naziv: "Mrkva", količina: 12 },
    { naziv: "Sir", količina: 1 },
    { naziv: "Kruh", količina: 3 },
  ],
});

const dohvatiCijenu = (naziv) =>
  proizvodi.value.find((p) => p.naziv === naziv).cijena;

const sveukupnaCijena = computed(() => {
  let ukupno = 0;
  korisnik.value.kosarica.forEach((stavka) => {
    ukupno += dohvatiCijenu(stavka.naziv) * stavka.količina;
  });
  return ukupno.toFixed(2);
});

const najskupljaStavka = computed(() => {
  let maxCijena = 0;
  let najskupljiProizvod = "";

  korisnik.value.kosarica.forEach((stavka) => {
    const ukupnaCijenaStavke = dohvatiCijenu(stavka.naziv) * stavka.količina;
    if (ukupnaCijenaStavke > maxCijena) {
      maxCijena = ukupnaCijenaStavke;
      najskupljiProizvod = stavka.naziv;
    }
  });

  return najskupljiProizvod;
});
</script>

<style scoped>
body {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  line-height: 1.6;
}

.admin,
.user {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

h1,
h2 {
  color: #2c3e50;
  margin-top: 0;
  padding-bottom: 5px;
}

hr {
  border: none;
  border-top: 1px solid #eaeaea;
  margin: 10px 0 15px 0;
}

.kosarica-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 0 auto 25px auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.item-content {
  display: flex;
  align-items: center;
  width: 100%;
}

img {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  object-fit: contain;
}

.item-details {
  flex-grow: 1;
}

.item-details h3 {
  margin-top: 0;
  margin-bottom: 8px;
  color: #2c3e50;
}

.item-details p {
  margin: 5px 0;
  color: #555;
}

.najskuplja {
  border: 2px solid #e74c3c;
  background-color: #fef5f5;
}

p {
  margin: 5px 0;
}

.ukupno {
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 20px;
  text-align: right;
  padding: 10px 0;
  border-top: 1px solid #eaeaea;
}

.admin {
  color: #2471a3;
}

.user {
  color: #333;
}

h1 {
  font-size: 1.8em;
  margin-bottom: 15px;
}

.cijene {
  font-weight: 500;
}

.ukupna-cijena {
  font-weight: bold;
  color: #e74c3c;
}
</style>