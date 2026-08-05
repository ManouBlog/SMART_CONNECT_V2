<script>
import html2pdf from "html2pdf.js";

export default {
    name: "InvoicePdf",
    props: {
        // Données de la facture
        details: {
            type: Object,
            required: true,
        },

        // Informations de l'entreprise
        company: {
            type: Object,
            default: () => ({
                name: "",
                logo: "",
                address: "",
                city: "",
                country: "",
                phone: "",
                email: "",
                website: "",
                taxNumber: "",
                registrationNumber: "",
            }),
        },
        // Informations du client
        customer: {
            type: Object,
            default: () => ({
                fullname: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                country: "",
            }),
        },

        // Numéro de facture
        invoiceNumber: {
            type: String,
            default: "",
        },

        // Titre de la facture
        title: {
            type: String,
            default: "FACTURE",
        },

        // Devise
        currency: {
            type: String,
            default: "FCFA",
        },

        // Afficher le logo
        showLogo: {
            type: Boolean,
            default: true,
        },

        // Autoriser le téléchargement
        downloadable: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            moneyFormat: new Intl.NumberFormat("de-DE"),
        };
    },
    computed: {
    },
    methods: {

        getCompanyInitials(fullname) {

            if (!fullname) {
                return "NA";
            }

            const names = fullname
                .trim()
                .split(" ")
                .filter(Boolean);


            if (names.length === 1) {

                return names[0]
                    .substring(0, 2)
                    .toUpperCase();

            }


            return (
                names[0].charAt(0) +
                names[names.length - 1].charAt(0)
            ).toUpperCase();

        },
        async downloadPdf() {
            try {
                this.loadingPdf = true;

                this.$emit("pdf-start");

                const element = this.$refs.invoice;

                const options = {

                    margin: 8,

                    filename: `${this.invoiceNumber || "facture"}.pdf`,

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
                this.loadingPdf = false;
            }

        }
    },
    async created() {
    },
};
</script>
<template>
    <div class="invoice_container_one">

        <div class="invoice_container" ref="invoice" id="invoice">

            <!-- ================= HEADER ================= -->

            <div class="invoice_header">

                <div class="company">

                    <img v-if="showLogo && company.logo" :src="company.logo" class="company-logo" alt="Logo" />

                    <div v-else class="company-avatar">
                        {{ getCompanyInitials(company.name) }}
                    </div>

                    <div>

                        <h2>{{ company.name }}</h2>

                        <p>{{ company.address }}</p>

                        <p>{{ company.phone }}</p>

                        <p>{{ company.email }}</p>

                    </div>

                </div>

                <div class="invoice-title">
                    <p>
                        <strong>N° :</strong>
                        {{ invoiceNumber }}
                    </p>

                    <p>
                        <strong>Date :</strong>
                        {{ details.created_at }}
                    </p>

                </div>

            </div>

            <hr>

            <!-- ================= CLIENT ================= -->

            <div class="invoice-section">

                <div class="block">
                    <p><strong>Gérant :</strong> {{ customer.fullname }}</p>
                    <p><strong>Email :</strong> {{ customer.email }}</p>
                    <p>
                        <strong>Référence :</strong>
                        {{ details.transaction_id }}
                    </p>
                </div>
            </div>
            <!-- ================= TABLE ================= -->
            <table class="invoice-table">

                <thead>

                    <tr>

                        <th>Désignation</th>

                        <th>Valeur</th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td>Formule</td>

                        <td>{{ details.abonement.libelle }}</td>

                    </tr>

                    <tr>

                        <td>Profil principal</td>

                        <td>{{ details.abonement.categorie.categorie }}</td>

                    </tr>

                    <tr>

                        <td>Date de paiement</td>

                        <td>{{ details.created_at }}</td>

                    </tr>

                    <tr>

                        <td>Expiration</td>

                        <td>{{ details.echeance }}</td>

                    </tr>

                    <tr>

                        <td>Montant abonnement</td>

                        <td>{{ details.montant }}</td>

                    </tr>

                </tbody>

            </table>

            <!-- ================= HYBRIDES ================= -->

            <div v-if="details.add_profil_hybrides.length" class="mt-4">

                <h3>Profils hybrides</h3>

                <table class="invoice-table">

                    <thead>

                        <tr>

                            <th>Profil</th>

                            <th>Paiement</th>

                            <th>Date</th>

                            <th>Référence</th>

                            <th>Montant</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="(item, index) in details.add_profil_hybrides" :key="index">

                            <td>

                                {{ item.profil_hybride_add.statut }}

                            </td>

                            <td>

                                {{ item.moyen_paiement }}

                            </td>

                            <td>

                                {{ item.created_at }}

                            </td>

                            <td>

                                {{ item.transaction_id }}

                            </td>

                            <td>

                                {{ item.montant }}

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>
        </div>
        <div class="text-center mt-4">

            <button class="btn btn-success" @click="downloadPdf">

                Télécharger le PDF

            </button>

        </div>

    </div>
</template>
<style scoped>
.invoice_container_one {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px 3em;
    height: 500px;
}

.invoice_container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px 3em;
    border: 1px solid #ddd;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
}

header {
    text-align: center;
    margin-bottom: 20px;
}

.company-info {
    margin-top: 10px;
}

.client-info,
.invoice-details {
    margin-bottom: 20px;
}

.info-btn {
    display: flex;
    justify-content: flex-end;
    gap: 1em;
}

.info-signature {
    display: flex;
    justify-content: space-between;
}

.invoice-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.invoice-table th,
.invoice-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

.invoice-table th {
    background-color: #f2f2f2;
}

footer {
    text-align: right;
    font-size: 18px;
}
</style>