<template>
    <div class="receipt-container" ref="invoice">
        <!-- En-tête -->
        <header class="header">
            <div class="logo-section">
                <!-- <h1 class="logo">MonBrobroli</h1> -->
                 <img src="/monbrobroliLogoWhite.png" alt="monbrobroliLogoWhite" 
                 style="width: 170px;height: 130px;
                 position: absolute;top: -60px;"/>
                <span class="tagline">La marketplace de l'emploi qui connecte en un clic</span>
            </div>
            <div class="receipt-title">
                <span class="receipt-badge">
                    <span style="font-size: 0.8em;">REÇU D'ABONNEMENT</span>
                    <span style="font-size: 0.6em;display:block;">MB-2026-ENT-00001</span>
                </span>
            </div>
        </header>

        <!-- Section principale -->
        <main class="main-content">
            <!-- Informations du client -->
            <div class="client-info">
                <p style="font-size: 14px;color:gray;">REÇU DE</p>
                <h3>2A BATIMENT</h3>
                <p style="font-size: 14px;">Abidjan - Yopougon</p>
                <p style="font-size: 14px;">Entreprise individuelle</p>
                <p style="font-size: 14px;"> <span style="color:gray;">NCC:</span> XXXXXXXX</p>
                <div style="display: flex;align-items: center;gap:0.4em">
                    <div class="payment-details">
                        <p>Date de paiement: <strong>20/03/2026</strong></p>
                        <p>Mode de paiement: <strong>Orange Money</strong></p>
                    </div>
                    <div class="payment-details">
                        <p>Date d'expiration: <strong>20/03/2027</strong></p>
                        <p>Validité: <strong>1 an</strong></p>
                    </div>
                    <div class="payment-details">
                        <p>N° de transaction: <strong>OM-2026-08-05-XXXX</strong></p>
                    </div>
                </div>
            </div>

            <!-- Tableau des formules -->
            <div class="formula-table">
                <table>
                    <thead>
                        <tr>
                            <th>FORMULE</th>
                            <th>DESCRIPTION</th>
                            <th>MONTANT (FCFA)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="formula-name">BROBROLI PRO</td>
                            <td>Abonnement annuel - Espace...</td>
                            <td class="amount">25 000 FCFA</td>
                        </tr>
                        <tr class="total-row">
                            <td>TOTAL</td>
                            <td></td>
                            <td class="total-amount">25 000 FCFA</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>

        <!-- Pied de page -->
        <footer class="footer">
            <p class="footer-text">
                MONBROBROLI.COM · LA LOCOMOTIVE SARL — RCCM CI-ABJ-2018-B-24483 · ABIDJAN, CÔTE D'IVOIRE
            </p>
            <p class="disclaimer">
                Ce reçu tient lieu de quittance officielle pour le montant indiqué. Conservez-le pour votre
                comptabilité.
            </p>
        </footer>
    </div>
    <div class="text-center mt-4">

        <button class="btn btn-warning" @click="downloadPdf">

            {{ !loadingPdf ? 'Télécharger la facture' : 'Veuillez patienter...' }}

        </button>

    </div>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue';
import html2pdf from "html2pdf.js";

const loadingPdf = ref(false);
const invoice = useTemplateRef('invoice');
const invoiceNumber = ref('INV-001');


const downloadPdf = async () => {
    // Ensure the DOM element exists before proceeding
    if (!invoice.value) {
        console.error("Invoice element not found");
        return;
    }

    try {
        loadingPdf.value = true;
        const element = invoice.value;

        const options = {
            margin: 8,
            // CORRECTED: Removed 'this'
            filename: `${invoiceNumber.value || "facture"}.pdf`,
            image: {
                type: "jpeg",
                quality: 1,
            },
            html2canvas: {
                scale: 2,
                useCORS: true,
                scrollY: 0,
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait",
            },
        };

        await html2pdf().set(options).from(element).save();
    } catch (error) {
        console.error(error);
    } finally {
        loadingPdf.value = false;
    }
};
</script>

<style scoped>
/* Styles globaux */
.receipt-container {
    font-family: 'Arial', sans-serif;
    max-width: 800px;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* En-tête */
.header {
    background-color: #25525F;
    color: #FFFFFF;
    padding: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
}

.tagline {
    font-size: 0.9em;
    margin: 25px 0 0 0;
}

.receipt-title {
    text-align: right;
}

.receipt-badge {
    background-color: #F5A623;
    padding: 0.4em;
    border-radius: 5px;
    width: 200px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5px;

}

.logo-section {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    position: relative;
}

.receipt-id {
    font-size: 12px;
    opacity: 0.8;
}

/* Section principale */
.main-content {
    padding: 20px;
    background-color: #FFFFFF;
}

.client-info {
    background-color: #cedae093;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.client-info h2 {
    font-size: 16px;
    color: #25525F;
    margin-top: 0;
}

.client-info h3 {
    font-size: 20px;
    color: var(--text-dark);
    margin: 5px 0;
}

.payment-details {
    flex: 1;
}

.payment-details p {
    margin: 5px 0;
    font-size: 12px;
}

.transaction-info {
    text-align: right;
    margin-bottom: 20px;
    font-size: 14px;
}

.transaction-info p {
    margin: 5px 0;
}

/* Tableau des formules */
.formula-table {
    width: 100%;
    margin-bottom: 20px;
}

.formula-table table {
    width: 100%;
    border-collapse: collapse;
}

.formula-table th,
.formula-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #E0E0E0;
}

.formula-table th {
    background-color: #25525F;
    color: #FFFFFF;
    font-weight: bold;
}

.formula-name {
    color: #F5A623;
    font-weight: bold;
}

.amount {
    font-weight: bold;
    color: var(--text-dark);
}

.total-row {
    background-color: #25525F;
    color: #FFFFFF;
}

.total-amount {
    font-weight: bold;
    color: #F5A623;
}

/* Pied de page */
.footer {
    background-color: #25525F;
    color: #FFFFFF;
    padding: 15px;
    text-align: center;
    font-size: 12px;
}

.footer-text {
    margin: 0;
    font-size: 12px;
    color: #FFFFFF;
    text-align: center;
}

.disclaimer {
    margin: 10px 0 0 0;
    font-size: 9px;
    color: #FFFFFF;
    text-align: center;
}
</style>