-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'utilisateur');

-- CreateEnum
CREATE TYPE "StatutCommande" AS ENUM ('payee', 'annulee');

-- CreateEnum
CREATE TYPE "StatutTicket" AS ENUM ('valide', 'utilise');

-- CreateEnum
CREATE TYPE "StatutPaiement" AS ENUM ('succes', 'echec');

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'utilisateur',
    "date_inscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Concert" (
    "id" SERIAL NOT NULL,
    "ville" TEXT NOT NULL,
    "salle" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "nombre_tickets" INTEGER NOT NULL,
    "prix" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Concert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" SERIAL NOT NULL,
    "utilisateur_id" INTEGER NOT NULL,
    "date_commande" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(65,30) NOT NULL,
    "statut" "StatutCommande" NOT NULL DEFAULT 'payee',

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "commande_id" INTEGER NOT NULL,
    "concert_id" INTEGER NOT NULL,
    "code_unique" TEXT NOT NULL,
    "statut" "StatutTicket" NOT NULL DEFAULT 'valide',

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" SERIAL NOT NULL,
    "commande_id" INTEGER NOT NULL,
    "mode" TEXT NOT NULL,
    "montant" DECIMAL(65,30) NOT NULL,
    "date_paiement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statut" "StatutPaiement" NOT NULL DEFAULT 'succes',

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_code_unique_key" ON "Ticket"("code_unique");

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_commande_id_fkey" FOREIGN KEY ("commande_id") REFERENCES "Commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_concert_id_fkey" FOREIGN KEY ("concert_id") REFERENCES "Concert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_commande_id_fkey" FOREIGN KEY ("commande_id") REFERENCES "Commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;
