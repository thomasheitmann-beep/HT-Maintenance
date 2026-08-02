import React, { useState, useEffect, useMemo, useRef } from "react";

/* Logo HT Maintenance (charte graphique fournie par l'utilisateur), encodé en base64 pour un artefact autonome */
const LOGO_DARK = "data:image/png;base64,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";
const LOGO_WHITE = "data:image/webp;base64,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";
const BRAND = { blue: "#0A5DA8", silver: "#C0C6CE", dark: "#1A1F26", amber: "#FFC107" };
import {
  Plus, Search, AlertTriangle, CheckCircle2, AlertOctagon,
  Trash2, ArrowLeft, Building2, Clock, ChevronRight, ChevronDown,
  MapPin, ShieldCheck, FileText, Settings2, Printer, ImagePlus,
  Mail, PenLine, RotateCcw, ClipboardList, X, MinusCircle, Download, Upload,
} from "lucide-react";

/* =========================================================================
   SCHÉMAS DE CONTRÔLE — repris fidèlement des feuilles Excel par type
   ========================================================================= */

const EQUIPMENT_TYPES = [
  "Sécurité",
  "Interrupteur HTA",
  "Comptage HTA",
  "Interrupteur Fusible HTA",
  "Disjoncteur HTA",
  "Contacteur HTA",
  "Disjoncteur BT",
  "Interrupteur BT",
  "Transformateur",
  "Analyse d'huile",
  "Jeu de barre / Gaine à barre",
];

// petit constructeur : un contrôle avec Action + État final (+ champs de mesure optionnels)
const C = (key, label, fields, actionOptions) => ({ key, label, kind: "control", fields: fields || [], actionOptions });
// un poste "organes internes" : identification (référence / tension), sans conformité
const I = (key, label, fields) => ({
  key, label, kind: "info",
  fields: fields || [{ key: "reference", label: "Référence" }, { key: "tension", label: "Tension" }],
});
// un réglage / une mesure de test : valeurs uniquement, sans conformité
const S = (key, label, fields) => ({ key, label, kind: "setting", fields: fields || [] });

const F = (key, label, unit, options) => ({ key, label, unit, options });

/* ---- Listes déroulantes reprises des validations de données Excel ---- */
const LISTE_INTERVENANTS = ["Thomas HEITMANN"];
const LISTE_ETAT_INSTALLATION = ["Conforme (R.A.S)", "Dégradé (actions à prévoir)", "Défaillant (actions urgentes)"];
const REMARQUE_STANDARD_EQUIPEMENT = "Équipement contrôlé, en bon état de fonctionnement. Aucune anomalie relevée lors de cette intervention.";
const REMARQUE_STANDARD_INSTALLATION = "Installation en bon état général. Aucune anomalie majeure relevée lors de cette intervention.";
const LISTE_MARQUES = ["ABB", "AREVA", "ALSTOM", "ALSTHOM", "BBC", "CALOR EMAG", "CEM GARDY", "DELLE", "EATON", "EIB", "FELTEN et GUILLAUME", "MAGRINI GALILEO", "MERLIN GERIN", "ORMAZABAL", "POMMIER", "SCHNEIDER ELECTRIC", "SIEMENS"];
const LISTE_COURANT_ASSIGNE = ["200", "400", "630", "1250", "2500"];
const LISTE_TENSION_ASSIGNEE = ["12", "24", "36"];
const LISTE_TENSION_ORGANES = ["24", "48", "60", "110", "220", "380"];
const LISTE_TYPE_ORGANES = ["VCC", "VCA", "VCC/VCA"];
const LISTE_FABRICANT_FUSIBLE = ["Schneider", "ABB", "SIBA", "Ferraz Limitor", "MERSEN FERRAZ LIMITOR", "Schneider (MG)", "FERRAZ", "AREVA", "Alstom"];
const LISTE_TYPE_FUSIBLE = ["CEF", "FDW", "SHAWMUT", "SOLFUSE", "LIMITOR", "HHD"];
const LISTE_IN_FUSIBLE = ["4", "10", "16", "20", "25", "32", "40", "50", "63", "80", "100", "125", "160", "200"];
const LISTE_UN_FUSIBLE = ["12", "24", "36"];
const LISTE_COURBE_RELAIS = ["Constant", "Inverse Normale CEI", "Très Inverse CEI", "Extrèment Inverse CEI", "Inverse Temps Long CEI"];
const LISTE_TYPE_RELAIS = ["Indépendant", "Dépendant"];
const LISTE_TEMPO_UNITE = ["ms", "s"];
const LISTE_ETAT_SEUIL = ["", "Actif"];
const LISTE_TR_MODE = ["Ajustable", "Fixe"];
const LISTE_TR_CLASSE = ["1.5", "6"];
const LISTE_RELAIS_MARQUE = ["SEPAM", "MICOM"];
const LISTE_REF_DISJONCTEUR = ["SF1", "ORTHOFLUOR"];
const LISTE_TYPE_CELLULE = {
  "Interrupteur HTA": ["INTERRUPTEUR - IM", "INTERRUPTEUR - IS", "INTERRUPTEUR - N1G", "INTERRUPTEUR - SDC"],
  "Comptage HTA": ["COMPTAGE - CM", "COMPTAGE - CM2", "COMPTAGE - LT", "COMPTAGE - N5G", "COMPTAGE - TM"],
  "Interrupteur Fusible HTA": ["INTERRUPTEUR-FUSIBLE - QM", "INTERRUPTEUR-FUSIBLE - PM", "INTERRUPTEUR-FUSIBLE - PFA", "INTERRUPTEUR-FUSIBLE - PF", "INTERRUPTEUR-FUSIBLE - P3G", "INTERRUPTEUR-FUSIBLE - N3G", "INTERRUPTEUR-FUSIBLE - SDF"],
  "Disjoncteur HTA": ["DISJONCTEUR - DM1", "DISJONCTEUR - D1G", "DISJONCTEUR - DM2", "DISJONCTEUR - D2G", "DISJONCTEUR - PGC", "DISJONCTEUR - PGB", "DISJONCTEUR - SBC"],
  "Contacteur HTA": ["DISJONCTEUR - DM1", "DISJONCTEUR - D1G", "DISJONCTEUR - DM2", "DISJONCTEUR - D2G", "DISJONCTEUR - PGC", "DISJONCTEUR - PGB", "DISJONCTEUR - SBC"],
};
const LISTE_MARQUE_BRK = ["MASTERPACT", "COMPACT", "IZM", "NZM", "MEGAMAX", "ISOMAX", "EMAX", "EMAX 2", "SPECTRONIC", "MPACT", "3WL", "3WN", "DMX", "DMX³", "DPX"];
const LISTE_TYPE_TRANSFORMATEUR = ["TRANSFORMATEUR DE DISTRIBUTION", "TRANSFORMATEUR", "AUTO-TRANSFORMATEUR", "TRANSFORMATEUR A DOUBLE SECONDAIRE", "TRANSFORMATEUR SEC ENROBÉ"];
const LISTE_TYPE_JDB = ["Jeu de barres", "Gaine à barres"];
const LISTE_CONCLUSION_DGA = ["Normal", "Surveillance", "Alerte", "Critique"];
const LISTE_MARQUE_TDY = ["ABB", "ALSTOM", "AREVA", "CAHORS", "CONTI TRANSFO", "EFACEC", "ELKIMA", "France TRANSFO", "GBE", "MATELEC", "MERLIN GERIN", "PAUWELS", "SCHNEIDER ELECTRIC", "SIEMENS", "SNT DURIEZ", "UNELEC"];
const LISTE_COUPLAGE_TDY = ["Yzn11", "Dyn11", "Dzn10", "Dzn6", "Yyn6", "Yzn5", "Dyn5", "Yyn0", "Yz11", "Yd11", "Dy11", "Dz10", "Dz6", "Yy6", "Dd6", "Yz5", "Yd5", "Dy5", "Yy0", "Dd0"];
const OUI_NON_LIST = ["OUI", "NON"];
const TENSION_ISOLEMENT = ["200", "500", "1000", "5000", "10000", "15000"];
const UNITE_ISOLEMENT = ["GΩ", "MΩ", "Ω"];

const L1L2L3 = (unit) => [F("l1", "L1", unit), F("l2", "L2", unit), F("l3", "L3", unit)];

const numOf = (v) => { const n = parseFloat(v); return isNaN(n) ? null : n; };

const FUSIBLE_FIELDS = [
  F("fabricant", "Fabricant", null, LISTE_FABRICANT_FUSIBLE),
  F("type", "Type", null, LISTE_TYPE_FUSIBLE),
  F("reference", "Référence"),
  F("in", "In", "A", LISTE_IN_FUSIBLE),
  F("un", "Un", "kV", LISTE_UN_FUSIBLE),
  ...L1L2L3("µΩ"),
  F("valeur", "R mesurée à 20°C", "mΩ"),
  { key: "tol_min", label: "Tolérance min", unit: "mΩ", unitFrom: "valeur", compute: (f) => { const v = numOf(f.valeur); return v === null ? "" : Math.floor(v * 0.9); } },
  { key: "tol_max", label: "Tolérance max", unit: "mΩ", unitFrom: "valeur", compute: (f) => { const v = numOf(f.valeur); return v === null ? "" : Math.ceil(v * 1.1); } },
];
const TC_FIELDS = [F("type", "Type"), F("couplage", "Couplage"), F("puissance", "Puissance", "VA"), F("classe", "Classe")];

const MECA_CELLULE = [
  C("manoeuvre_int_sect", "Manœuvres de l'interrupteur-sectionneur"),
  C("manoeuvre_sect_terre", "Manœuvres du sectionneur de terre"),
  C("densimetre_sf6", "Contrôle du densimètre SF6"),
  C("etat_general_cellule", "État général externe et interne de la cellule"),
];
const SECURITE_CELLULE = [
  C("continuite_masses", "Contrôle de la continuité des masses"),
  C("interverrouillage", "Contrôle de l'interverrouillage de sécurité"),
  C("fiche_manoeuvre", "Présence et exactitude de la fiche de manœuvre"),
];
const ORGANES_FIELDS = [{ key: "reference", label: "Référence" }, { key: "tension", label: "Tension", options: LISTE_TENSION_ORGANES }, { key: "type", label: "Type", options: LISTE_TYPE_ORGANES }];
const ORGANES_INTERNES = [
  I("bobine_manque", "Bobine à manque", ORGANES_FIELDS),
  I("declencheur_volt_1", "Déclencheur voltmétrique", ORGANES_FIELDS),
  I("declencheur_volt_2", "Déclencheur voltmétrique (2)", ORGANES_FIELDS),
  I("moteur", "Moteur", ORGANES_FIELDS),
];
const FUSIBLES = [
  C("fusibles_installes", "Fusibles installés", FUSIBLE_FIELDS),
  C("fusibles_rechange", "Fusibles de rechange", FUSIBLE_FIELDS),
  C("fusion_fusibles", "Fusion fusibles"),
];
const CONTROLES_DISJONCTEUR = [
  C("moteur_rearmement", "Contrôle du moteur de réarmement"),
  C("telecommande", "Contrôle de la télécommande"),
  C("contacts_position_disj", "Contrôle des contacts de position"),
  C("resistance_bobine_declenchement", "Résistances de la bobine de déclenchement", [F("rd", "Rd", "Ω"), F("tolerance", "Tolérance", "Ω")]),
  C("etat_isolants_disj", "État général des isolants"),
  C("etat_chambres_coupure", "État général des chambres de coupures"),
  C("resistance_contact_chambres", "Résistances de contact des chambres de coupure", [...L1L2L3("µΩ"), F("tolerance", "Tolérance", "µΩ")]),
  C("synchronisme_coupure", "Contrôle du synchronisme de coupure"),
  C("temps_fermeture", "Mesure du temps de fermeture", [...L1L2L3("ms")]),
  C("courbe_compensation_sf6", "Courbe de compensation pression SF6 / température", [F("reference", "Référence / commentaire")]),
  C("essai_dielectrique_pole", "Essai diélectrique après intervention sur le pôle"),
];
// Seuils du relais de protection : liste dynamique (un seul affiché par défaut, ajout au besoin)
// plutôt que les 6 lignes fixes de l'Excel — chaque seuil ajouté fait apparaître automatiquement
// sa ligne d'essai correspondante dans "Contrôles du relais de protection".
const PARAM_SEUIL_TYPES = [
  "Premier seuil de courant de phase", "Deuxième seuil de courant de phase", "Troisième seuil de courant de phase",
  "Premier seuil de courant homopolaire", "Deuxième seuil de courant homopolaire", "Troisième seuil de courant homopolaire",
];
function emptySeuilEntry(label) {
  return {
    id: uid(), label: label || "",
    fields: { etat: "", courbe: "", type: "", reglage: "", temporisation: "", temporisation_unite: "ms" },
    essai: { action: "", etat: "Conforme", fields: { l1: "", l2: "", l3: "", courant_injecte: "" } },
  };
}
// Contrôle du relais de protection non lié à un seuil précis (toujours affiché)
const CIRCUIT_MESURES_COMMANDE = C("circuit_mesures_commande", "Contrôle du circuit de mesures et commande");
const TYPES_AVEC_RELAIS = ["Disjoncteur HTA", "Contacteur HTA", "Interrupteur HTA", "Interrupteur Fusible HTA"];
// Reproduit fidèlement le fichier Excel : seuls les 1er et 2ème seuils de courant de phase ont une
// formule de tolérance qui s'adapte à l'unité choisie (s/ms) ; le 3ème seuil de phase et les 3 seuils
// homopolaires utilisent toujours la formule en ms, quelle que soit l'unité sélectionnée sur ces lignes.
function calcToleranceEssai(reglage, unite) {
  const r = numOf(reglage);
  if (r === null) return null;
  if (unite === "ms") return { min: Math.round((r * 0.9 + 30) * 100) / 100, max: Math.round((r + 120) * 100) / 100, unite: "ms" };
  return { min: Math.round((r * 0.9 + 0.03) * 100) / 100, max: Math.round((r * 1.1 + 0.12) * 100) / 100, unite: "s" };
}


const SCHEMAS = {
  "Interrupteur HTA": {
    identification: [{ key: "repere", label: "Repère / Nom de l'équipement" }, { key: "typeCellule", label: "Type de cellule", options: LISTE_TYPE_CELLULE["Interrupteur HTA"] }, { key: "numeroSerie", label: "Numéro de série" }],
    sections: [
      { key: "mecaniques", title: "Contrôles mécaniques", items: [
        ...MECA_CELLULE,
        C("essai_manoeuvre_charge", "Essai de manœuvre en charge"),
        C("essai_manoeuvre_hors_charge", "Essai de manœuvre hors charge"),
        C("verrouillage_sect_terre", "Contrôle du verrouillage mécanique interrupteur / sectionneur de terre"),
      ]},
      { key: "electriques", title: "Contrôles électriques", items: [
        C("indicateurs_capacitifs", "Contrôle des indicateurs capacitifs de présence tension"),
        C("connexions_puissance", "Contrôle des connexions de puissance"),
        C("tetes_cables", "Contrôle des têtes de câbles"),
        C("contacts_position", "Contrôle des contacts de position"),
      ]},
      { key: "organes", title: "Organes internes", items: ORGANES_INTERNES },
      { key: "securite", title: "Contrôles de sécurité", items: SECURITE_CELLULE },
      { key: "parametrage_relais", title: "Paramétrage du relais de protection", items: [] },
      { key: "controles_relais", title: "Contrôles du relais de protection", items: [CIRCUIT_MESURES_COMMANDE] },
      { key: "mesure_isolement", title: "Mesure d'isolement", items: [
        C("hta_terre", "HTA - Terre", [F("v", "Tension", null, TENSION_ISOLEMENT), F("valeur", "Valeur"), F("unite", "Unité", null, UNITE_ISOLEMENT)]),
        C("entre_phases", "Entre phases", [F("v", "Tension", null, TENSION_ISOLEMENT), F("valeur", "Valeur"), F("unite", "Unité", null, UNITE_ISOLEMENT)]),
      ]},
    ],
  },
  "Comptage HTA": {
    identification: [{ key: "repere", label: "Repère / Nom de l'équipement" }, { key: "typeCellule", label: "Type de cellule", options: LISTE_TYPE_CELLULE["Comptage HTA"] }, { key: "numeroSerie", label: "Numéro de série" }],
    sections: [
      { key: "mecaniques", title: "Contrôles mécaniques", items: MECA_CELLULE },
      { key: "electriques", title: "Contrôles électriques", items: [
        C("indicateurs_capacitifs", "Contrôle des indicateurs capacitifs de présence tension"),
        C("connexions_puissance", "Contrôle des connexions de puissance"),
        C("tetes_cables", "Contrôle des têtes de câbles"),
        C("contacts_position", "Contrôle des contacts de position"),
        C("tp", "Contrôle des transformateurs de potentiel (TP)", TC_FIELDS),
        ...FUSIBLES,
        C("rapport_tc_comptage", "Contrôle du rapport de transformation des TC de comptage", [...L1L2L3()]),
        C("scelles_plombs", "Vérification des scellés / plombs réglementaires"),
        C("etalonnage_compteur", "Contrôle de l'étalonnage du compteur", [F("date_verification", "Date de vérification métrologique")]),
      ]},
      { key: "securite", title: "Contrôles de sécurité", items: SECURITE_CELLULE },
    ],
  },
  "Interrupteur Fusible HTA": {
    identification: [{ key: "repere", label: "Repère / Nom de l'équipement" }, { key: "typeCellule", label: "Type de cellule", options: LISTE_TYPE_CELLULE["Interrupteur Fusible HTA"] }, { key: "numeroSerie", label: "Numéro de série" }],
    sections: [
      { key: "mecaniques", title: "Contrôles mécaniques", items: [
        ...MECA_CELLULE,
        C("essai_manoeuvre_charge", "Essai de manœuvre en charge"),
        C("essai_manoeuvre_hors_charge", "Essai de manœuvre hors charge"),
        C("verrouillage_sect_terre", "Contrôle du verrouillage mécanique interrupteur / sectionneur de terre"),
      ]},
      { key: "electriques", title: "Contrôles électriques", items: [
        C("indicateurs_capacitifs", "Contrôle des indicateurs capacitifs de présence tension"),
        C("connexions_puissance", "Contrôle des connexions de puissance"),
        C("tetes_cables", "Contrôle des têtes de câbles"),
        C("contacts_position", "Contrôle des contacts de position"),
        ...FUSIBLES,
      ]},
      { key: "organes", title: "Organes internes", items: ORGANES_INTERNES },
      { key: "securite", title: "Contrôles de sécurité", items: SECURITE_CELLULE },
      { key: "parametrage_relais", title: "Paramétrage du relais de protection", items: [] },
      { key: "controles_relais", title: "Contrôles du relais de protection", items: [CIRCUIT_MESURES_COMMANDE] },
      { key: "mesure_isolement", title: "Mesure d'isolement", items: [
        C("hta_terre", "HTA - Terre", [F("v", "Tension", null, TENSION_ISOLEMENT), F("valeur", "Valeur"), F("unite", "Unité", null, UNITE_ISOLEMENT)]),
        C("entre_phases", "Entre phases", [F("v", "Tension", null, TENSION_ISOLEMENT), F("valeur", "Valeur"), F("unite", "Unité", null, UNITE_ISOLEMENT)]),
      ]},
    ],
  },
  "Disjoncteur HTA": {
    identification: [
      { key: "repere", label: "Repère / Nom de l'équipement" }, 
      { key: "typeCellule", label: "Type de cellule", options: LISTE_TYPE_CELLULE["Disjoncteur HTA"] }, { key: "numeroSerie", label: "Numéro de série" },
      { key: "referenceDisjoncteur", label: "Référence du disjoncteur", options: LISTE_REF_DISJONCTEUR }, { key: "numeroSerieDisjoncteur", label: "Numéro de série (disjoncteur)" },
      { key: "referenceRelais", label: "Référence du relais", options: LISTE_RELAIS_MARQUE }, { key: "numeroSerieRelais", label: "Numéro de série (relais)" },
    ],
    sections: [
      { key: "mecaniques", title: "Contrôles mécaniques", items: MECA_CELLULE },
      { key: "electriques", title: "Contrôles électriques", items: [
        C("indicateurs_capacitifs", "Contrôle des indicateurs capacitifs de présence tension"),
        C("etat_isolants", "État général des isolants"),
        C("connexions_puissance", "Contrôle des connexions de puissance"),
        C("contacts_position", "Contrôle des contacts de position"),
        C("tc_protection", "Contrôle des TC de protection", TC_FIELDS),
        C("tc_mesure", "Contrôle des TC de mesure", TC_FIELDS),
      ]},
      { key: "organes", title: "Organes internes", items: ORGANES_INTERNES },
      { key: "securite", title: "Contrôles de sécurité", items: [
        C("continuite_masses", "Contrôle de la continuité des masses", [F("valeur", "Valeur", "mΩ")]),
        C("interverrouillage", "Contrôle de l'interverrouillage de sécurité"),
        C("fiche_manoeuvre", "Présence et exactitude de la fiche de manœuvre"),
      ]},
      { key: "parametrage_relais", title: "Paramétrage du relais de protection", items: [] },
      { key: "controles_disjoncteur", title: "Contrôles du disjoncteur", items: CONTROLES_DISJONCTEUR },
      { key: "controles_relais", title: "Contrôles du relais de protection", items: [CIRCUIT_MESURES_COMMANDE] },
    ],
  },
  "Contacteur HTA": {
    identification: [
      { key: "repere", label: "Repère / Nom de l'équipement" }, 
      { key: "typeCellule", label: "Type de cellule", options: LISTE_TYPE_CELLULE["Contacteur HTA"] }, { key: "numeroSerie", label: "Numéro de série" },
      { key: "referenceContacteur", label: "Référence du contacteur", options: LISTE_REF_DISJONCTEUR }, { key: "numeroSerieContacteur", label: "Numéro de série (contacteur)" },
      { key: "referenceRelais", label: "Référence du relais", options: LISTE_RELAIS_MARQUE }, { key: "numeroSerieRelais", label: "Numéro de série (relais)" },
    ],
    sections: [
      { key: "mecaniques", title: "Contrôles mécaniques", items: MECA_CELLULE },
      { key: "electriques", title: "Contrôles électriques", items: [
        C("indicateurs_capacitifs", "Contrôle des indicateurs capacitifs de présence tension"),
        C("etat_isolants", "État général des isolants"),
        C("connexions_puissance", "Contrôle des connexions de puissance"),
        C("contacts_position", "Contrôle des contacts de position"),
        C("tc_protection", "Contrôle des TC de protection", TC_FIELDS),
        C("tc_mesure", "Contrôle des TC de mesure", TC_FIELDS),
        ...FUSIBLES,
      ]},
      { key: "securite", title: "Contrôles de sécurité", items: [
        C("continuite_masses", "Contrôle de la continuité des masses", [F("valeur", "Valeur", "mΩ")]),
        C("interverrouillage", "Contrôle de l'interverrouillage de sécurité"),
        C("fiche_manoeuvre", "Présence et exactitude de la fiche de manœuvre"),
      ]},
      { key: "parametrage_relais", title: "Paramétrage du relais de protection", items: [] },
      { key: "controles_disjoncteur", title: "Contrôles du disjoncteur", items: CONTROLES_DISJONCTEUR },
      { key: "controles_relais", title: "Contrôles du relais de protection", items: [CIRCUIT_MESURES_COMMANDE] },
    ],
  },
  "Disjoncteur BT": {
    identification: [
      { key: "repere", label: "Repère / Nom de l'équipement" }, 
      { key: "nomTGBT", label: "Nom du TGBT" }, { key: "utilisation", label: "Utilisation" },
      { key: "typeDisjoncteur", label: "Type disjoncteur", options: LISTE_MARQUE_BRK }, { key: "numeroSerieDisjoncteur", label: "Numéro de série" },
      { key: "referenceRelais", label: "Référence du relais", options: LISTE_RELAIS_MARQUE }, { key: "numeroSerieRelais", label: "Numéro de série (relais)" },
      { key: "intensiteNominale", label: "Intensité nominale (A)", numeric: true }, { key: "debrochable", label: "Débrochable", options: OUI_NON_LIST },
    ],
    sections: [
      { key: "mecaniques", title: "Contrôles mécaniques", items: [
        C("manoeuvre_int_sect", "Manœuvres du disjoncteur"),
        C("graissage_plages", "Graissage des plages de puissance"),
        C("connexions_puissance", "Contrôle des connexions de puissance"),
        C("nettoyage_general", "Nettoyage général externe et interne"),
        C("contact_puissances", "Contact de puissances"),
      ]},
      { key: "electriques", title: "Contrôles électriques", items: [
        C("contacts_auxiliaires", "Contacts auxiliaires"),
        C("resistances_contacts", "Résistances des contacts", [...L1L2L3("µΩ"), F("n", "N", "µΩ")]),
        C("verif_unite_controle", "Vérification unité de contrôle"),
        C("tension_aux_unite", "Tension auxiliaire de l'unité de contrôle"),
        C("signalisation", "Signalisation"),
        C("thermographie_connexions", "Contrôle thermographique des connexions", [F("temperature", "Température relevée", "°C")]),
        C("contacts_aux_signalisation", "Vérification des contacts auxiliaires de signalisation (OF/SD)"),
        C("bouton_test_rearmement", "Test du bouton test / réarmement"),
      ]},
      { key: "organes", title: "Organes internes", items: ORGANES_INTERNES },
      { key: "reglage_disjoncteur", title: "Réglage du disjoncteur", items: [
        S("surcharge_longue", "Surcharge longue", [F("inominal", "I nominal", "A"), F("k1", "K1"), F("k2", "K2"), F("ineutre", "Ineutre", "A"), F("tr_mode", "tr", null, LISTE_TR_MODE), F("tr", "tr", "s"), F("tr_classe", "à (x Ir)", null, LISTE_TR_CLASSE)]),
        S("cc_temporise", "Court-circuit temporisé", [F("im_fonction_de", "Im fonction de", null, ["Ir", "In"]), F("k", "K"), F("tsd", "tsd", "ms"), F("i2t", "I²t")]),
        S("instantane", "Instantané", [F("ii", "Ii", "kA")]),
        S("pouvoir_coupure", "Pouvoir de coupure", [F("icu", "Icu", "kA")]),
      ]},
      { key: "tests_disjoncteur", title: "Tests du disjoncteur", items: [
        C("test_surcharge_longue", "Surcharge longue", [F("test_a", "Test à", "x Ir"), F("tr_max", "Tr max attendu", "x Ir"), F("declenchement", "Déclenchement", "s")]),
        C("test_cc_temporise", "Court-circuit temporisé", [F("test_a", "Test à", "x Im"), F("declenchement_t0", "Déclenchement à T=0", "ms"), F("declenchement_treg", "Déclenchement à T réglé", "ms")]),
        C("test_instantane", "Instantané", [F("valise_str", "Valise STR", "mA"), F("declenchement", "Déclenchement", "ms")]),
      ]},
      { key: "courbe_declenchement", title: "Courbe de déclenchement", items: [
        S("courbe", "Courbe de déclenchement", [F("reference", "Référence / fichier joint")]),
      ]},
    ],
  },
  "Interrupteur BT": {
    identification: [
      { key: "repere", label: "Repère / Nom de l'équipement" },
      { key: "nomTGBT", label: "Nom du TGBT" }, { key: "utilisation", label: "Utilisation" },
      { key: "typeDisjoncteur", label: "Type", options: LISTE_MARQUE_BRK }, { key: "numeroSerieDisjoncteur", label: "Numéro de série" },
      { key: "intensiteNominale", label: "Intensité nominale (A)", numeric: true }, { key: "debrochable", label: "Débrochable", options: OUI_NON_LIST },
    ],
    sections: [
      { key: "mecaniques", title: "Contrôles mécaniques", items: [
        C("manoeuvre_int_sect", "Manœuvres de l'interrupteur"),
        C("graissage_plages", "Graissage des plages de puissance"),
        C("connexions_puissance", "Contrôle des connexions de puissance"),
        C("nettoyage_general", "Nettoyage général externe et interne"),
        C("contact_puissances", "Contact de puissances"),
      ]},
      { key: "electriques", title: "Contrôles électriques", items: [
        C("contacts_auxiliaires", "Contacts auxiliaires"),
        C("resistances_contacts", "Résistances des contacts", [...L1L2L3("µΩ"), F("n", "N", "µΩ")]),
        C("verif_unite_controle", "Vérification unité de contrôle"),
        C("tension_aux_unite", "Tension auxiliaire de l'unité de contrôle"),
        C("signalisation", "Signalisation"),
        C("thermographie_connexions", "Contrôle thermographique des connexions", [F("temperature", "Température relevée", "°C")]),
        C("contacts_aux_signalisation", "Vérification des contacts auxiliaires de signalisation (OF/SD)"),
        C("bouton_test_rearmement", "Test du bouton test / réarmement"),
      ]},
      { key: "organes", title: "Organes internes", items: ORGANES_INTERNES },
    ],
  },
  "Transformateur": {
    identification: [
      { key: "repere", label: "Repère / Nom de l'équipement" }, 
      { key: "typeTransformateur", label: "Type de transformateur", options: LISTE_TYPE_TRANSFORMATEUR }, { key: "numeroSerie", label: "Numéro de série" },
      { key: "marque", label: "Marque", options: LISTE_MARQUE_TDY }, { key: "anneeMiseEnService", label: "Année de mise en service" },
      { key: "puissance", label: "Puissance (KVA)", numeric: true }, { key: "tensionPrimaire", label: "Tension primaire (KV)", numeric: true },
      { key: "couplage", label: "Couplage", options: LISTE_COUPLAGE_TDY }, { key: "tensionSecondaire", label: "Tension secondaire (V)", numeric: true },
      { key: "ucc", label: "Ucc (%)", numeric: true },
    ],
    sections: [
      { key: "environnement", title: "Contrôles environnements", items: [
        C("integrite_enveloppe", "Intégrité de l'enveloppe de protection"),
        C("proprete_transfo", "Propreté du transformateur"),
        C("indice_protection", "Indice de protection", [F("ip", "IP")]),
        C("mises_terre", "Mises à la terre de l'enveloppe de protection", [F("resistance", "Résistance terre-enveloppe")]),
        C("barrettes_commutation", "Barrettes de commutation", [F("plot_reglage", "Plot de réglage entre"), F("valeur_tension", "Valeur de tension", "V")]),
        C("raccordement_cables", "Raccordement des câbles HT et BT"),
        C("distances_refroidissement", "Distances extérieures nécessaires au refroidissement"),
        C("raccordement_sondes", "Raccordement des sondes de température aux relais thermiques"),
        C("niveau_huile_silicagel", "Contrôle du niveau d'huile et de l'état du silicagel (respirateur)"),
      ]},
      { key: "electriques", title: "Contrôles électriques", items: [
        C("indicateurs_capacitifs", "Contrôle des indicateurs capacitifs de présence tension"),
        C("connexions_bt", "Contrôle des connexions BT"),
        C("tetes_cables_hta", "Contrôle des têtes de câbles HTA"),
        C("verrouillage_cle", "Vérification du système de verrouillage à clé"),
      ]},
      { key: "relais_protection", title: "Contrôle du relais de protection", items: [
        C("type_relais", "Type", [F("valeur", "Sélection", null, ["DGPT2", "DMCR", "BUCHHOLZ", "AUTRE", "MSF 220 VU (ZIEHL)", "MSF 220 K (ZIEHL)", "MSF 220 SE (ZIEHL)", "MSF 220 V (ZIEHL)", "C512 - C513 (ABB)"])]),
        C("test_degagements_gazeux", "Test dégagements gazeux", [], ["Sans action du relais", "Mise hors tension", "Mise hors charge", "Mise hors tension et hors charge", "SANS OBJET"]),
        C("test_pression_excessive", "Test pression excessive", [F("valeur", "Valeur", "Bars")], ["Sans action du relais", "Mise hors tension", "Mise hors charge", "Mise hors tension et hors charge", "SANS OBJET"]),
        C("test_defaut_temp_t1", "Test défaut temp T1", [F("valeur", "Valeur", "°C")], ["Sans action du relais", "Mise hors tension", "Mise hors charge", "Mise hors tension et hors charge", "SANS OBJET"]),
        C("test_defaut_temp_t2", "Test défaut temp T2", [F("valeur", "Valeur", "°C")], ["Sans action du relais", "Mise hors tension", "Mise hors charge", "Mise hors tension et hors charge", "SANS OBJET"]),
      ]},
      { key: "rapport_transformation", title: "Rapport de transformation", items: [
        C("rapport_theorique", "Rapport théorique"),
        C("rapport_par_phase", "Rapport par phase", [F("l1", "L1"), F("l2", "L2"), F("l3", "L3")]),
        C("resistance_enroulements_primaire", "Résistance des enroulements — Primaire", [...L1L2L3("mΩ")]),
        C("resistance_enroulements_secondaire", "Résistance des enroulements — Secondaire", [...L1L2L3("mΩ")]),
      ]},
      { key: "mesure_isolement", title: "Mesure d'isolement", items: [
        C("hta_terre", "HTA - Terre", [F("v", "Tension", null, TENSION_ISOLEMENT), F("valeur", "Valeur"), F("unite", "Unité", null, UNITE_ISOLEMENT)]),
        C("bt_terre_1", "BT - Terre", [F("v", "Tension", null, TENSION_ISOLEMENT), F("valeur", "Valeur"), F("unite", "Unité", null, UNITE_ISOLEMENT)]),
        C("bt_terre_2", "HTA - BT", [F("v", "Tension", null, TENSION_ISOLEMENT), F("valeur", "Valeur"), F("unite", "Unité", null, UNITE_ISOLEMENT)]),
        C("pi", "PI (10/1min)", [F("v", "Tension", null, TENSION_ISOLEMENT)]),
        C("dar", "DAR (60/10sec)", [F("v", "Tension", null, TENSION_ISOLEMENT)]),
      ]},
    ],
  },
  "Analyse d'huile": {
    identification: [
      { key: "repere", label: "Repère / Nom de l'équipement" },
      { key: "transformateurAssocie", label: "Transformateur associé (repère)" },
      { key: "laboratoire", label: "Laboratoire" }, { key: "datePrelevement", label: "Date de prélèvement" },
    ],
    sections: [
      { key: "resultats", title: "Résultats d'analyse", items: [
        C("rigidite_dielectrique", "Rigidité diélectrique", [F("valeur", "Valeur", "kV")]),
        C("teneur_eau", "Teneur en eau", [F("valeur", "Valeur", "ppm")]),
        C("acidite", "Acidité (indice de neutralisation)", [F("valeur", "Valeur", "mgKOH/g")]),
        C("tension_interfaciale", "Tension interfaciale", [F("valeur", "Valeur", "mN/m")]),
        C("facteur_dissipation", "Facteur de dissipation (tan δ)", [F("valeur", "Valeur", "%")]),
        C("analyse_gaz_dissous", "Analyse des gaz dissous (DGA)", [F("conclusion", "Conclusion", null, LISTE_CONCLUSION_DGA)]),
      ]},
    ],
  },
  "Jeu de barre / Gaine à barre": {
    identification: [
      { key: "repere", label: "Repère / Nom de l'équipement" },
      { key: "type", label: "Type", options: LISTE_TYPE_JDB }, { key: "marque", label: "Fabricant / Marque" },
      { key: "tensionAssignee", label: "Tension assignée (kV)", numeric: true }, { key: "courantAssigne", label: "Courant assigné (A)", numeric: true },
      { key: "nombrePhases", label: "Nombre de phases", options: ["3", "4"] }, { key: "longueur", label: "Longueur (m)", numeric: true },
      { key: "anneeMiseEnService", label: "Année de mise en service", numeric: true },
    ],
    sections: [
      { key: "mecaniques", title: "Contrôles mécaniques", items: [
        C("fixations_supports", "Fixations et supports"),
        C("joints_dilatation", "État des joints de dilatation"),
        C("alignement_troncons", "Alignement des tronçons"),
        C("capots_enveloppes", "État des capots / enveloppes de protection"),
        C("proprete_corps_etrangers", "Propreté et absence de corps étrangers"),
      ]},
      { key: "electriques", title: "Contrôles électriques", items: [
        C("serrage_connexions", "Contrôle du serrage des connexions", [F("couple", "Couple de serrage", "N.m")]),
        C("resistance_jonctions", "Résistance de contact aux jonctions", [...L1L2L3("µΩ"), F("n", "N", "µΩ")]),
        C("etat_isolants_entretoises", "État des isolants et entretoises"),
        C("continuite_masses_jdb", "Continuité des masses et mise à la terre", [F("valeur", "Valeur", "mΩ")]),
        C("thermographie", "Contrôle thermographique / points chauds", [F("temperature", "Température relevée", "°C")]),
      ]},
      { key: "mesure_isolement", title: "Mesure d'isolement", items: [
        C("phase1_terre", "Phase 1 - Terre", [F("v", "Tension", null, TENSION_ISOLEMENT), F("valeur", "Valeur"), F("unite", "Unité", null, UNITE_ISOLEMENT)]),
        C("phase2_terre", "Phase 2 - Terre", [F("v", "Tension", null, TENSION_ISOLEMENT), F("valeur", "Valeur"), F("unite", "Unité", null, UNITE_ISOLEMENT)]),
        C("phase3_terre", "Phase 3 - Terre", [F("v", "Tension", null, TENSION_ISOLEMENT), F("valeur", "Valeur"), F("unite", "Unité", null, UNITE_ISOLEMENT)]),
        C("phase_phase", "Phase - Phase", [F("v", "Tension", null, TENSION_ISOLEMENT), F("valeur", "Valeur"), F("unite", "Unité", null, UNITE_ISOLEMENT)]),
        C("pi_jdb", "PI (10/1min)", [F("v", "Tension", null, TENSION_ISOLEMENT)]),
        C("dar_jdb", "DAR (60/10sec)", [F("v", "Tension", null, TENSION_ISOLEMENT)]),
      ]},
    ],
  },
  "Sécurité": {
    identification: [],
    sections: [
      { key: "environnement_local", title: "Environnement et sécurité du local", items: [
        C("conformite_local", "Conformité et environnement du local", [
          F("proprete", "Propreté"), F("eclairage", "Éclairage"), F("temperature", "Température"),
          F("ventilation", "Ventilation ou climatisation"), F("affichagePlan", "Affichage du plan unifilaire"),
          F("affichageConsignes", "Affichage des consignes de sécurité"),
        ]),
      ]},
      { key: "materiel_securite", title: "Matériel de sécurité", items: [
        S("tabouret_tapis", "Tabouret ou tapis isolant", [F("present", "Présent", null, OUI_NON_LIST)]),
        S("gants_isolants", "Gants isolants", [F("present", "Présent", null, OUI_NON_LIST)]),
        S("perche_sauvetage", "Perche de sauvetage", [F("present", "Présent", null, OUI_NON_LIST)]),
        S("perche_vat", "Perche de vérification d'absence de tension", [F("present", "Présent", null, OUI_NON_LIST)]),
        S("extincteur", "Extincteur (type B - feux électriques)", [F("present", "Présent", null, OUI_NON_LIST)]),
        S("lampe_securite", "Lampe de sécurité", [F("present", "Présent", null, OUI_NON_LIST)]),
        S("casque_ecran", "Casque ou écran facial", [F("present", "Présent", null, OUI_NON_LIST)]),
      ]},
      { key: "enveloppe_protection", title: "Enveloppe de protection", items: [
        C("conformite_enveloppe", "Conformité de l'enveloppe de protection", [
          F("indiceProtection", "Indice de protection (IP)"), F("integriteEnveloppe", "Intégrité de l'enveloppe"),
          F("misesTerre", "Mises à la terre de l'enveloppe"), F("distancesMinimales", "Distances minimales de sécurité"),
        ]),
      ]},
    ],
  },
};

/* =========================================================================
   Helpers état / rang de conformité
   ========================================================================= */

// Accord grammatical (masculin/féminin, singulier/pluriel) des mots d'état ("Dégradé(e)(s)", "Défaillant(e)(s)"…)
function agree(word, gender, plural) {
  let w = word;
  if (gender === "f" && !w.endsWith("e")) w += "e";
  if (plural && !w.endsWith("s")) w += "s";
  return w;
}
// Genre de chaque type d'équipement (tous masculins sauf "Sécurité")
function equipGender(type) { return type === "Sécurité" ? "f" : "m"; }
// Genre/nombre du nom sous-entendu par chaque intitulé de contrôle (ex. "Résistances…" → féminin pluriel)
const ITEM_GENDER = {
  "Barrettes de commutation": ["f", true], "Bobine à manque": ["f", false], "Casque ou écran facial": ["m", false],
  "Conformité de l'enveloppe de protection": ["f", false], "Conformité et environnement du local": ["f", false],
  "Contact de puissances": ["m", false], "Contacts auxiliaires": ["m", true],
  "Contrôle de l'interverrouillage de sécurité": ["m", false], "Contrôle de la continuité des masses": ["m", false],
  "Contrôle de la télécommande": ["m", false], "Contrôle des TC de mesure": ["m", false], "Contrôle des TC de protection": ["m", false],
  "Contrôle des connexions BT": ["m", false], "Contrôle des connexions de puissance": ["m", false],
  "Contrôle des contacts de position": ["m", false], "Contrôle des indicateurs capacitifs de présence tension": ["m", false],
  "Contrôle des transformateurs de potentiel (TP)": ["m", false], "Contrôle des têtes de câbles": ["m", false],
  "Contrôle des têtes de câbles HTA": ["m", false], "Contrôle du circuit de mesures et commande": ["m", false],
  "Contrôle du densimètre SF6": ["m", false], "Contrôle du moteur de réarmement": ["m", false], "Contrôle du synchronisme de coupure": ["m", false],
  "Courbe de déclenchement": ["f", false], "Court-circuit temporisé": ["m", false],
  "Distances extérieures nécessaires au refroidissement": ["f", true],
  "Déclencheur voltmétrique": ["m", false], "Déclencheur voltmétrique (2)": ["m", false],
  "Essai de déclenchement 1er seuil courant de phase": ["m", false], "Essai de déclenchement 1er seuil courant homopolaire": ["m", false],
  "Essai de déclenchement 2ème seuil courant de phase": ["m", false], "Essai de déclenchement 2ème seuil courant homopolaire": ["m", false],
  "Essai de déclenchement 3ème seuil courant de phase": ["m", false], "Essai de déclenchement 3ème seuil courant homopolaire": ["m", false],
  "Extincteur (type B - feux électriques)": ["m", false], "Fusibles de rechange": ["m", true], "Fusibles installés": ["m", true],
  "Fusion fusibles": ["f", false], "Gants isolants": ["m", true], "Graissage des plages de puissance": ["m", false],
  "Indice de protection": ["m", false], "Instantané": ["m", false], "Intégrité de l'enveloppe de protection": ["f", false],
  "Lampe de sécurité": ["f", false], "Manœuvres de l'interrupteur-sectionneur": ["f", true], "Manœuvres du sectionneur de terre": ["f", true], "Manœuvres du disjoncteur": ["f", true],
  "Mises à la terre de l'enveloppe de protection": ["f", true], "Moteur": ["m", false], "Nettoyage général externe et interne": ["m", false],
  "Perche de sauvetage": ["f", false], "Perche de vérification d'absence de tension": ["f", false], "Pouvoir de coupure": ["m", false],
  "Premier seuil de courant de phase": ["m", false], "Premier seuil de courant homopolaire": ["m", false],
  "Propreté du transformateur": ["f", false], "Présence et exactitude de la fiche de manœuvre": ["f", false],
  "Raccordement des câbles HT et BT": ["m", false], "Raccordement des sondes de température aux relais thermiques": ["m", false],
  "Rapport par phase": ["m", false], "Rapport théorique": ["m", false],
  "Résistances de contact des chambres de coupure": ["f", true], "Résistances de la bobine de déclenchement": ["f", true], "Résistances des contacts": ["f", true],
  "Signalisation": ["f", false], "Surcharge longue": ["f", false], "Tabouret ou tapis isolant": ["m", false],
  "Tension auxiliaire de l'unité de contrôle": ["f", false], "Test défaut temp T1": ["m", false], "Test défaut temp T2": ["m", false],
  "Test dégagements gazeux": ["m", false], "Test pression excessive": ["m", false],
  "Troisième seuil de courant de phase": ["m", false], "Troisième seuil de courant homopolaire": ["m", false], "Type": ["m", false],
  "Vérification du système de verrouillage à clé": ["f", false], "Vérification unité de contrôle": ["f", false],
  "État général des chambres de coupures": ["m", false], "État général des isolants": ["m", false], "État général externe et interne de la cellule": ["m", false],
  "Fixations et supports": ["f", true], "État des joints de dilatation": ["m", false], "Alignement des tronçons": ["m", false],
  "État des capots / enveloppes de protection": ["m", false], "Propreté et absence de corps étrangers": ["f", false],
  "Contrôle du serrage des connexions": ["m", false], "Résistance de contact aux jonctions": ["f", false],
  "État des isolants et entretoises": ["m", false], "Continuité des masses et mise à la terre": ["f", false],
  "Contrôle thermographique / points chauds": ["m", false],
};
function itemAgreement(label) {
  const g = ITEM_GENDER[label];
  return g ? { gender: g[0], plural: g[1] } : { gender: "m", plural: false };
}

const RANK_OF = {
  "Conforme": 0, "À corriger": 1, "Dégradé": 1, "Conforme avec réserves": 1, "Non conforme": 2, "Défaillant": 2, "Non réalisé": -1, "Non présent": -1,
  "Conforme (R.A.S)": 0, "Dégradé (actions à prévoir)": 1, "Défaillant (actions urgentes)": 2,
};
const RANK_COLOR = {
  "-1": { color: "#5B6B7D", bg: "rgba(143,163,184,0.14)", icon: MinusCircle },
  0: { color: "#2DD4BF", bg: "rgba(45,212,191,0.12)", icon: CheckCircle2 },
  1: { color: "#FB923C", bg: "rgba(251,146,60,0.12)", icon: AlertTriangle },
  2: { color: "#EF4444", bg: "rgba(239,68,68,0.14)", icon: AlertOctagon },
};
const EQUIP_STATUSES = ["Conforme", "Dégradé", "Défaillant", "Non réalisé", "Non présent"];
const CONFORMITE_STATUSES = ["Conforme", "À corriger", "Non conforme"];
const OUI_NON = ["OUI", "NON"];

const STORAGE_KEY = "ht-sites-v4";

function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }
function todayISO() { return new Date().toISOString().slice(0, 10); }
function daysUntil(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T00:00:00");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((d - now) / 86400000);
}

function createControlesDefaults(schema) {
  const controles = {};
  schema.sections.forEach((sec) => {
    controles[sec.key] = {};
    sec.items.forEach((item) => {
      const fieldsDefault = {};
      (item.fields || []).forEach((f) => {
        fieldsDefault[f.key] = "";
        if (unitFamilyFor(f.unit)) fieldsDefault[f.key + "Unite"] = f.unit;
      });
      controles[sec.key][item.key] =
        item.kind === "control" ? { action: "", etat: "Conforme", fields: fieldsDefault } : { fields: fieldsDefault };
    });
    controles[sec.key + "__custom"] = [];
    if (sec.key === "parametrage_relais") controles.parametrage_relais_seuils = [emptySeuilEntry(PARAM_SEUIL_TYPES[0])];
  });
  return controles;
}

function emptyEquipement(type) {
  const schema = SCHEMAS[type];
  const identification = {};
  schema.identification.forEach((f) => (identification[f.key] = ""));
  const controles = createControlesDefaults(schema);
  if (type === "Sécurité") {
    Object.keys(controles.materiel_securite).forEach((k) => { controles.materiel_securite[k].fields.present = "OUI"; });
  }
  return {
    id: uid(),
    type,
    identification,
    controles,
    etatFinal: "Conforme",
    remarques: "",
    photos: [],
    courbeFiles: [],
    rapportLaboFiles: [],
  };
}

function emptySite() {
  const next = new Date();
  next.setFullYear(next.getFullYear() + 1);
  return {
    id: uid(),
    nom: "",
    client: "",
    local: "",
    rapport: {
      date: todayISO(), intervenant: "", heureArrivee: "", heureFin: "",
      marque: "", anneeMiseEnService: "", courantAssigne: "", tensionAssignee: "", nombreEquipements: "",
      environnementEtat: "Conforme (R.A.S)", environnementRemarque: "",
      fonctionnementEtat: "Conforme (R.A.S)", fonctionnementRemarque: "",
      prochaineMaintenance: next.toISOString().slice(0, 10),
      syntheseRemarques: "",
      photos: [],
    },
    equipements: [],
  };
}

function worstRank(labels) { return labels.reduce((worst, l) => Math.max(worst, RANK_OF[l] ?? 0), 0); }

/* =========================================================================
   Rapport d'intervention (document client, indépendant du suivi de maintenance)
   ========================================================================= */
const ACTIONS_INTERVENTION = [
  "Contrôle visuel", "Nettoyage", "Resserrage des connexions", "Contrôle des mesures de sécurité",
  "Contrôle du fonctionnement mécanique", "Contrôle du fonctionnement électrique", "Essai de déclenchement",
  "Remplacement de pièce", "Réglage du relais de protection", "Mesure d'isolement", "Graissage",
  "Vérification des reports d'alarme", "Mise à jour du paramétrage", "Contrôle du serrage",
  "Contrôle de l'état des isolants", "Mise en service", "Diagnostic de panne", "Autre",
];
const NATURE_INTERVENTION = [
  { key: "preventive", label: "Préventive" },
  { key: "corrective", label: "Corrective" },
  { key: "miseEnService", label: "Mise en service" },
  { key: "expertise", label: "Expertise" },
];
const CONCLUSION_INTERVENTION = ["Conforme", "Conforme avec réserves", "Non conforme"];
const INTERVENTIONS_STORAGE_KEY = "ht-interventions-v1";

function nextNumeroRI(interventions) {
  const year = new Date().getFullYear();
  const n = interventions.filter((i) => i.numeroRI && i.numeroRI.startsWith(`RI-${year}-`)).length + 1;
  return `RI-${year}-${String(n).padStart(3, "0")}`;
}

function emptyIntervention(numeroRI) {
  return {
    id: uid(),
    numeroRI,
    client: "", site: "", emailClient: "", date: todayISO(), technicien: "",
    heureDebut: "", heureFin: "",
    equipement: { type: "", constructeur: "", modele: "", numeroSerie: "", localisation: "", reference: "" },
    nature: { preventive: false, corrective: false, miseEnService: false, expertise: false },
    travauxActions: [],
    travauxRealises: "",
    mesures: { isolement: "", resistanceContact: "", tempsManoeuvre: "", essaisFonctionnels: "", observations: "" },
    anomaliesRecommandations: "",
    conclusion: "Conforme",
    validation: { nomClient: "", signatureClient: null, technicienHT: "", signatureHT: null },
    linkedSiteId: null,
    linkedEquipementId: null,
  };
}

function dureeIntervention(heureDebut, heureFin) {
  if (!heureDebut || !heureFin) return "";
  const [h1, m1] = heureDebut.split(":").map(Number);
  const [h2, m2] = heureFin.split(":").map(Number);
  let mins = (h2 * 60 + m2) - (h1 * 60 + m1);
  if (isNaN(mins)) return "";
  if (mins < 0) mins += 24 * 60;
  const h = Math.floor(mins / 60), m = mins % 60;
  return `${h}h${String(m).padStart(2, "0")}`;
}

function prefillInterventionFromSite(site, eq, numeroRI) {
  const base = emptyIntervention(numeroRI);
  const idf = eq ? eq.identification : {};
  return {
    ...base,
    client: site.client,
    site: site.nom || site.local,
    date: site.rapport.date || todayISO(),
    technicien: site.rapport.intervenant || "",
    heureDebut: site.rapport.heureArrivee || "",
    heureFin: site.rapport.heureFin || "",
    equipement: {
      type: eq ? eq.type : "",
      constructeur: idf.marque || site.rapport.marque || "",
      modele: idf.typeCellule || idf.typeTransformateur || idf.typeDisjoncteur || "",
      numeroSerie: idf.numeroSerie || idf.numeroSerieDisjoncteur || idf.numeroSerieContacteur || idf.numeroSerieRelais || "",
      localisation: site.local,
      reference: idf.repere || "",
    },
    nature: { ...base.nature, preventive: true },
    conclusion: eq ? eq.etatFinal : rankToLabel(overallRank(site)),
    anomaliesRecommandations: eq ? eq.remarques || "" : "",
    linkedSiteId: site.id,
    linkedEquipementId: eq ? eq.id : null,
  };
}

function overallRank(site) {
  return worstRank([site.rapport.environnementEtat, site.rapport.fonctionnementEtat, ...site.equipements.map((e) => e.etatFinal)]);
}
function rankToLabel(rank) { return rank === 2 ? "Défaillant" : rank === 1 ? "Dégradé" : "Conforme"; }

/* =========================================================================
   Composants UI génériques
   ========================================================================= */

function StatusBadge({ label, size = "md", gender = "m", plural = false }) {
  const rank = RANK_OF[label] ?? 0;
  const s = RANK_COLOR[rank];
  const Icon = s.icon;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5, padding: size === "sm" ? "2px 8px" : "4px 10px",
      borderRadius: 999, background: s.bg, color: s.color, fontSize: size === "sm" ? 11 : 12, fontWeight: 600,
      letterSpacing: 0.2, border: `1px solid ${s.color}33`, whiteSpace: "nowrap",
    }}>
      <Icon size={size === "sm" ? 12 : 13} /> {agree(label, gender, plural)}
    </span>
  );
}

function Field({ label, children, span }) {
  return (
    <div style={{ gridColumn: span ? `span ${span}` : undefined }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#5B6B7D", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", background: "#F7F8FA", border: "1px solid #D8DEE5", borderRadius: 8,
  padding: "9px 11px", color: "#1A1F26", fontSize: 13.5, outline: "none", boxSizing: "border-box", fontFamily: "inherit",
};
function TextInput(props) { return <input {...props} style={{ ...inputStyle, ...(props.style || {}) }} />; }
function Select(props) { return <select {...props} style={{ ...inputStyle, ...(props.style || {}) }}>{props.children}</select>; }
function TextArea(props) { return <textarea {...props} style={{ ...inputStyle, resize: "vertical", minHeight: 60, ...(props.style || {}) }} />; }

// Familles de grandeurs : un champ dont l'unité appartient à l'une de ces familles propose
// un sélecteur pour changer d'échelle (ex. mV / V / kV) au lieu d'une unité figée.
const UNIT_FAMILIES = {
  tension: ["mV", "V", "kV"],
  courant: ["mA", "A", "kA"],
  resistance: ["µΩ", "mΩ", "Ω", "kΩ"],
  puissance: ["VA", "kVA", "MVA"],
};
function unitFamilyFor(u) {
  for (const fam of Object.values(UNIT_FAMILIES)) if (fam.includes(u)) return fam;
  return null;
}

// Champ "liste déroulante + saisie libre" : suggestions via <datalist>, mais toute valeur tapée est acceptée.
function Combo({ value, onChange, options, listId, style, placeholder, numeric }) {
  return (
    <>
      <input
        type={numeric ? "number" : "text"}
        step={numeric ? "any" : undefined}
        list={listId}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ ...inputStyle, ...(style || {}) }}
      />
      <datalist id={listId}>
        {options.map((o) => <option key={o} value={o} />)}
      </datalist>
    </>
  );
}

// Valeur numérique + unité : si l'unité appartient à une famille (V/A/Ω/VA), un sélecteur
// permet de changer d'échelle (mV/V/kV…) ; sinon l'unité reste affichée telle quelle.
function NumberWithUnit({ value, unit, onValueChange, onUnitChange, width }) {
  const family = unitFamilyFor(unit);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <input
        type="number" step="any"
        value={value ?? ""}
        onChange={(e) => onValueChange(e.target.value)}
        style={{ ...inputStyle, width: width || 66, padding: "5px 7px", fontSize: 12 }}
      />
      {family ? (
        <select value={unit || family[0]} onChange={(e) => onUnitChange(e.target.value)} style={{ ...inputStyle, width: 62, padding: "5px 4px", fontSize: 11.5 }}>
          {family.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
      ) : unit ? (
        <span style={{ fontSize: 11, color: "#8B96A3" }}>{unit}</span>
      ) : null}
    </span>
  );
}

/* ---- Photos (compressées côté navigateur puis stockées en base64) ---- */
function compressImage(file, maxDim = 1100, quality = 0.68) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const scale = maxDim / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("image invalide"));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error("lecture impossible"));
    reader.readAsDataURL(file);
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error("lecture impossible"));
    reader.readAsDataURL(file);
  });
}

// Galerie de pièces jointes générique : photo / capture d'écran (compressée) ou document PDF (stocké tel quel).
function FileGallery({ files, onChange, idPrefix }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const list = files || [];

  async function handleFiles(fileList) {
    setBusy(true);
    const picked = Array.from(fileList);
    const added = [];
    for (const file of picked) {
      try {
        const isPdf = file.type === "application/pdf";
        const dataUrl = isPdf ? await readFileAsDataUrl(file) : await compressImage(file);
        added.push({ id: uid(), dataUrl, name: file.name, isPdf, caption: "" });
      } catch (e) {
        // fichier ignoré si illisible
      }
    }
    onChange([...list, ...added]);
    setBusy(false);
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <SectionTitle>Pièces jointes (photo, capture d'écran, PDF)</SectionTitle>
        <button onClick={() => inputRef.current && inputRef.current.click()} disabled={busy} style={btnGhost(BRAND.amber)}>
          <ImagePlus size={13} /> {busy ? "Import…" : "Ajouter un fichier"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,application/pdf"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files && e.target.files.length) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
      {list.length === 0 ? (
        <div style={{ textAlign: "center", padding: 22, color: "#8B96A3", fontSize: 12.5, border: "1px dashed #D8DEE5", borderRadius: 10 }}>
          Aucune pièce jointe
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
          {list.map((f) => (
            <div key={f.id}>
              <div style={{ position: "relative" }}>
                {f.isPdf ? (
                  <a href={f.dataUrl} download={f.name || "document.pdf"} style={{
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
                    width: "100%", height: 96, borderRadius: 8, border: "1px solid #D8DEE5", background: "#F7F8FA", textDecoration: "none",
                  }}>
                    <FileText size={22} color="#5B6B7D" />
                    <span style={{ fontSize: 10, color: "#5B6B7D", padding: "0 6px", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>{f.name || "document.pdf"}</span>
                  </a>
                ) : (
                  <img src={f.dataUrl} alt="" style={{ width: "100%", height: 96, objectFit: "cover", borderRadius: 8, border: "1px solid #D8DEE5", display: "block" }} />
                )}
                <button
                  onClick={() => onChange(list.filter((x) => x.id !== f.id))}
                  style={{ position: "absolute", top: 4, right: 4, background: "rgba(10,15,25,0.85)", border: "none", borderRadius: 6, padding: 3, cursor: "pointer", color: "#EF4444", display: "flex" }}
                  title="Supprimer"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <input
                value={f.caption}
                onChange={(e) => onChange(list.map((x) => (x.id === f.id ? { ...x, caption: e.target.value } : x)))}
                placeholder="Légende"
                style={{ ...inputStyle, marginTop: 6, fontSize: 11, padding: "4px 6px" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PhotoGallery({ photos, onChange, idPrefix }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const list = photos || [];

  async function handleFiles(fileList) {
    setBusy(true);
    const files = Array.from(fileList);
    const added = [];
    for (const file of files) {
      try {
        const dataUrl = await compressImage(file);
        added.push({ id: uid(), dataUrl, caption: "" });
      } catch (e) {
        // fichier ignoré si illisible
      }
    }
    onChange([...list, ...added]);
    setBusy(false);
  }

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <SectionTitle>Photos</SectionTitle>
        <button onClick={() => inputRef.current && inputRef.current.click()} disabled={busy} style={btnGhost("#FFC107")}>
          <ImagePlus size={13} /> {busy ? "Import…" : "Ajouter des photos"}
        </button>
        <input
          ref={inputRef}
          id={`file-${idPrefix}`}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files && e.target.files.length) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
      {list.length === 0 ? (
        <div style={{ textAlign: "center", padding: 22, color: "#8B96A3", fontSize: 12.5, border: "1px dashed #D8DEE5", borderRadius: 10 }}>
          Aucune photo
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
          {list.map((p) => (
            <div key={p.id}>
              <div style={{ position: "relative" }}>
                <img src={p.dataUrl} alt="" style={{ width: "100%", height: 96, objectFit: "cover", borderRadius: 8, border: "1px solid #D8DEE5", display: "block" }} />
                <button
                  onClick={() => onChange(list.filter((x) => x.id !== p.id))}
                  style={{ position: "absolute", top: 4, right: 4, background: "rgba(10,15,25,0.85)", border: "none", borderRadius: 6, padding: 3, cursor: "pointer", color: "#EF4444", display: "flex" }}
                  title="Supprimer la photo"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <input
                value={p.caption}
                onChange={(e) => onChange(list.map((x) => (x.id === p.id ? { ...x, caption: e.target.value } : x)))}
                placeholder="Légende"
                style={{ ...inputStyle, marginTop: 6, fontSize: 11, padding: "4px 6px" }}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/* ---- Signature tactile (canvas), avec repli "nom + date" si non signé ---- */
function SignatureCanvas({ value, onSave, width = 340, height = 120 }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (value) {
      const img = new window.Image();
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.src = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pos(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: (point.clientX - rect.left) * (canvas.width / rect.width), y: (point.clientY - rect.top) * (canvas.height / rect.height) };
  }
  function start(e) {
    if (e.cancelable) e.preventDefault();
    drawing.current = true;
    last.current = pos(e);
  }
  function move(e) {
    if (!drawing.current) return;
    if (e.cancelable) e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const p = pos(e);
    ctx.strokeStyle = BRAND.dark;
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  }
  function end() {
    if (!drawing.current) return;
    drawing.current = false;
  }
  function clear() {
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }
  function save() {
    onSave(canvasRef.current.toDataURL("image/png"));
  }

  // Les gestionnaires tactiles posés via les props JSX (onTouchMove…) sont attachés en mode
  // "passif" par React : preventDefault() y est alors ignoré et la page défile quand même
  // pendant la signature. On attache donc ces écouteurs nous-mêmes en mode non-passif,
  // seule méthode fiable pour bloquer le défilement pendant le tracé sur iOS/Safari.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const opts = { passive: false };
    canvas.addEventListener("touchstart", start, opts);
    canvas.addEventListener("touchmove", move, opts);
    canvas.addEventListener("touchend", end, opts);
    canvas.addEventListener("touchcancel", end, opts);
    return () => {
      canvas.removeEventListener("touchstart", start, opts);
      canvas.removeEventListener("touchmove", move, opts);
      canvas.removeEventListener("touchend", end, opts);
      canvas.removeEventListener("touchcancel", end, opts);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ width: "100%", maxWidth: width, height, background: "#fff", borderRadius: 8, border: "1px solid #D8DEE5", touchAction: "none", cursor: "crosshair", display: "block" }}
        onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
      />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={clear} style={{ ...btnGhost(), fontSize: 11, padding: "5px 10px" }}><RotateCcw size={12} /> Effacer</button>
        <button onClick={save} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: BRAND.blue, border: "none", color: "#fff", borderRadius: 8, padding: "6px 14px", fontSize: 11.5, fontWeight: 700, cursor: "pointer" }}>
          <PenLine size={12} /> Valider la signature
        </button>
      </div>
    </div>
  );
}

// Ouvre la signature dans une fenêtre dédiée (au lieu d'un pavé intégré à la page qui défile) :
// ça isole complètement le geste de signature du défilement de la page sur mobile, et laisse
// plus de place pour signer confortablement.
function SignatureField({ label, value, onChange }) {
  const [open, setOpen] = useState(false);

  // Bloque le défilement de toute la page tant que la fenêtre de signature est ouverte :
  // sans ça, un doigt qui touche légèrement à côté du tracé peut encore faire défiler
  // la page derrière la fenêtre sur iOS.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#5B6B7D", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
      {value ? (
        <div>
          <img src={value} alt={label} style={{ width: "100%", maxWidth: 260, height: 90, objectFit: "contain", background: "#fff", borderRadius: 8, border: "1px solid #D8DEE5", display: "block" }} />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={() => setOpen(true)} style={{ ...btnGhost(), fontSize: 11, padding: "5px 10px" }}><PenLine size={12} /> Modifier la signature</button>
            <button onClick={() => onChange(null)} style={{ ...btnGhost("#EF4444"), fontSize: 11, padding: "5px 10px" }}><Trash2 size={12} /> Effacer</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} style={{ ...btnGhost(BRAND.blue), fontSize: 12.5, padding: "8px 14px" }}>
          <PenLine size={13} /> Signer
        </button>
      )}

      {open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(4,9,16,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 220, padding: 16, touchAction: "none" }} onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#F7F8FA", border: "1px solid #D8DEE5", borderRadius: 14, padding: 20, maxWidth: 420, width: "100%", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1F26", marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 12, color: "#5B6B7D", marginBottom: 14 }}>Signez avec le doigt ou la souris ci-dessous</div>
            <SignatureCanvas
              value={value}
              width={360}
              height={160}
              onSave={(dataUrl) => { onChange(dataUrl); setOpen(false); }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
              <button onClick={() => setOpen(false)} style={btnGhost()}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Confirmation intégrée à l'app (window.confirm est souvent bloqué dans l'iframe des artefacts).
function ConfirmDialog({ message, confirmLabel = "Supprimer", onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(4,9,16,0.72)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 }} onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#F7F8FA", border: "1px solid #D8DEE5", borderRadius: 14, padding: 22, maxWidth: 380, width: "100%", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
        <div style={{ fontSize: 14, color: "#1A1F26", marginBottom: 20, lineHeight: 1.5 }}>{message}</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onCancel} style={btnGhost()}>Annuler</button>
          <button onClick={onConfirm} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EF4444", border: "none", color: "#fff", borderRadius: 8, padding: "9px 16px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// Confirmation totalement intégrée à la page (aucune fenêtre superposée) : bascule le bouton
// en "Confirmer / Annuler" sur place. Solution de repli fiable si les superpositions posent
// problème dans certains environnements.
function InlineConfirmButton({ icon: Icon, label, color = "#EF4444", onConfirm }) {
  const [confirming, setConfirming] = useState(false);
  if (!confirming) {
    return (
      <button onClick={() => setConfirming(true)} style={btnGhost(color)}>
        <Icon size={13} /> {label}
      </button>
    );
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.35)", borderRadius: 8, padding: "5px 8px" }}>
      <span style={{ fontSize: 12, color: "#B91C1C", fontWeight: 600 }}>Confirmer ?</span>
      <button
        onClick={onConfirm}
        style={{ background: "#EF4444", border: "none", color: "#fff", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
      >
        Oui, supprimer
      </button>
      <button onClick={() => setConfirming(false)} style={{ background: "none", border: "none", color: "#5B6B7D", fontSize: 12, cursor: "pointer", padding: "5px 6px" }}>
        Annuler
      </button>
    </span>
  );
}

function Card({ children, style }) {
  return <div style={{ background: "#FFFFFF", border: "1px solid #D8DEE5", borderRadius: 14, padding: 20, ...(style || {}) }}>{children}</div>;
}
function SectionTitle({ children }) {
  return <div style={{ fontSize: 11.5, fontWeight: 700, color: "#5B6B7D", letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 12, fontFamily: "'Rajdhani', 'Inter', sans-serif" }}>{children}</div>;
}
function btnPrimary() {
  return { display: "inline-flex", alignItems: "center", gap: 6, background: "#FFC107", border: "none", color: "#1A1F26", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" };
}
function btnGhost(color) {
  return { display: "inline-flex", alignItems: "center", gap: 6, background: "#E2E6EB", border: "1px solid #D8DEE5", color: color || "#3E4A5C", borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" };
}

function KpiCard({ icon: Icon, label, value, accent }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #D8DEE5", borderRadius: 14, padding: "16px 18px", flex: 1, minWidth: 150 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: (accent || "#FFC107") + "1F", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={13} color={accent || "#FFC107"} />
        </div>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: "#5B6B7D", letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</span>
      </div>
      <div style={{ fontSize: 27, fontWeight: 700, color: "#1A1F26", fontVariantNumeric: "tabular-nums", fontFamily: "'Rajdhani', 'Inter', sans-serif" }}>{value}</div>
    </div>
  );
}

/* ---- ligne de contrôle générique (control / info / setting) ---- */
function ControlRow({ item, value, onChange, idPrefix }) {
  const setField = (k, v) => onChange({ ...value, fields: { ...value.fields, [k]: v } });
  return (
    <div style={{ padding: "10px 0", borderBottom: "1px solid #E2E6EB" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12.5, color: "#3E4A5C", flex: "1 1 240px" }}>{item.label}</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {(item.fields || []).map((f) =>
            f.compute ? (
              <label key={f.key} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#8B96A3" }}>
                {f.label}
                <span style={{ ...inputStyle, width: 66, padding: "5px 7px", fontSize: 12, background: "#EEF2F6", color: "#0A5DA8", fontWeight: 700, display: "inline-block", textAlign: "center" }}>
                  {f.compute(value.fields) ?? "—"}
                </span>
                {(() => {
                  const u = f.unitFrom ? (value.fields[f.unitFrom + "Unite"] || f.unit) : f.unit;
                  return u ? <span>{u}</span> : null;
                })()}
              </label>
            ) : f.options ? (
              <label key={f.key} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#8B96A3" }}>
                {f.label}
                <Combo
                  value={value.fields[f.key]}
                  onChange={(v) => setField(f.key, v)}
                  options={f.options}
                  listId={`${idPrefix}-${item.key}-${f.key}`}
                  style={{ width: 130, padding: "5px 7px", fontSize: 12 }}
                />
              </label>
            ) : (
              <label key={f.key} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#8B96A3" }}>
                {f.label}
                {f.unit ? (
                  <NumberWithUnit
                    value={value.fields[f.key]}
                    unit={value.fields[f.key + "Unite"] || f.unit}
                    onValueChange={(v) => setField(f.key, v)}
                    onUnitChange={(u) => setField(f.key + "Unite", u)}
                  />
                ) : (
                  <input
                    type="text"
                    value={value.fields[f.key] ?? ""}
                    onChange={(e) => setField(f.key, e.target.value)}
                    style={{ ...inputStyle, width: 70, padding: "5px 7px", fontSize: 12 }}
                  />
                )}
              </label>
            )
          )}
          {value.action !== undefined && (
            <Combo
              value={value.action}
              onChange={(v) => onChange({ ...value, action: v })}
              options={item.actionOptions || ["SANS OBJET"]}
              listId={`${idPrefix}-${item.key}-action`}
              placeholder="Action"
              style={{ width: 150, padding: "5px 7px", fontSize: 12 }}
            />
          )}
          {value.etat !== undefined && (
            <Select value={value.etat} onChange={(e) => onChange({ ...value, etat: e.target.value })} style={{ width: 120, padding: "5px 7px", fontSize: 12 }}>
              {EQUIP_STATUSES.map((s) => <option key={s} value={s}>{agree(s, itemAgreement(item.label).gender, itemAgreement(item.label).plural)}</option>)}
            </Select>
          )}
        </div>
      </div>
    </div>
  );
}

function CustomActionsList({ custom, onAdd, onChange, onRemove, idPrefix }) {
  return (
    <div style={{ marginTop: custom.length > 0 ? 4 : 10 }}>
      {custom.map((c) => (
        <div key={c.id} style={{ padding: "10px 0", borderBottom: "1px solid #E2E6EB" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <input
              value={c.label}
              onChange={(e) => onChange(c.id, { label: e.target.value })}
              placeholder="Intitulé du contrôle ajouté"
              style={{ ...inputStyle, flex: "1 1 240px", padding: "6px 9px", fontSize: 12.5 }}
            />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <Combo
                value={c.action}
                onChange={(v) => onChange(c.id, { action: v })}
                options={["SANS OBJET"]}
                listId={`${idPrefix}-custom-${c.id}-action`}
                placeholder="Action"
                style={{ width: 150, padding: "5px 7px", fontSize: 12 }}
              />
              <Select value={c.etat} onChange={(e) => onChange(c.id, { etat: e.target.value })} style={{ width: 120, padding: "5px 7px", fontSize: 12 }}>
                {EQUIP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </Select>
              <button onClick={() => onRemove(c.id)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: 4 }} title="Retirer">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button onClick={onAdd} style={{ ...btnGhost(BRAND.amber), marginTop: 10 }}>
        <Plus size={13} /> Ajouter une action
      </button>
    </div>
  );
}

function SectionBlock({ title, items, values, onChangeItem, idPrefix, custom, onAddCustom, onChangeCustom, onRemoveCustom, extra }) {
  return (
    <Card style={{ marginBottom: 14 }}>
      <SectionTitle>{title}</SectionTitle>
      <div>
        {items.map((item) => (
          <ControlRow key={item.key} item={item} value={values[item.key]} onChange={(v) => onChangeItem(item.key, v)} idPrefix={idPrefix} />
        ))}
      </div>
      {custom && (
        <CustomActionsList custom={custom} onAdd={onAddCustom} onChange={onChangeCustom} onRemove={onRemoveCustom} idPrefix={idPrefix} />
      )}
      {extra && <div style={{ marginTop: 14 }}>{extra}</div>}
    </Card>
  );
}

/* =========================================================================
   Vue d'ensemble (liste des sites)
   ========================================================================= */
function Overview({ sites, onOpen, onNew }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [sortKey, setSortKey] = useState("prochaine");

  const enriched = useMemo(() => sites.map((s) => ({ ...s, _rank: overallRank(s), _prochaine: s.rapport.prochaineMaintenance })), [sites]);

  const filtered = useMemo(() => {
    let list = enriched;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((s) => (s.nom + " " + s.client + " " + s.local + " " + s.rapport.intervenant).toLowerCase().includes(q));
    }
    if (statusFilter !== "Tous") list = list.filter((s) => rankToLabel(s._rank) === statusFilter);
    if (sortKey === "prochaine") list = [...list].sort((a, b) => new Date(a._prochaine) - new Date(b._prochaine));
    else if (sortKey === "client") list = [...list].sort((a, b) => a.client.localeCompare(b.client));
    return list;
  }, [enriched, query, statusFilter, sortKey]);

  const kpis = useMemo(() => {
    let degrade = 0, defaillant = 0, urgent = 0;
    enriched.forEach((s) => {
      if (s._rank === 1) degrade++;
      if (s._rank === 2) defaillant++;
      const d = daysUntil(s._prochaine);
      if (d !== null && d <= 30) urgent++;
    });
    return { total: sites.length, degrade, defaillant, urgent };
  }, [sites, enriched]);

  return (
    <div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <KpiCard icon={Building2} label="Sites suivis" value={kpis.total} />
        <KpiCard icon={Clock} label="Maintenance sous 30 j" value={kpis.urgent} accent="#FFC107" />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 220px", position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: 11, top: 10, color: "#8B96A3" }} />
          <TextInput placeholder="Rechercher client, site, intervenant…" value={query} onChange={(e) => setQuery(e.target.value)} style={{ paddingLeft: 32 }} />
        </div>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: 170 }}>
          <option value="Tous">Tous statuts</option>
          <option value="Conforme">Conforme</option>
          <option value="Dégradé">Dégradé</option>
          <option value="Défaillant">Défaillant</option>
        </Select>
        <Select value={sortKey} onChange={(e) => setSortKey(e.target.value)} style={{ width: 210 }}>
          <option value="prochaine">Trier : prochaine maintenance</option>
          <option value="client">Trier : client (A→Z)</option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#FFFFFF", border: "1px dashed #D8DEE5", borderRadius: 14 }}>
          <MapPin size={28} color="#9AA5B1" style={{ marginBottom: 10 }} />
          <div style={{ fontSize: 14, fontWeight: 600, color: "#3E4A5C", marginBottom: 4 }}>
            {sites.length === 0 ? "Aucun site enregistré" : "Aucun résultat pour ces filtres"}
          </div>
          <div style={{ fontSize: 12.5, color: "#8B96A3", marginBottom: 16 }}>
            {sites.length === 0 ? "Ajoutez votre premier site pour commencer le suivi." : "Essayez d'élargir votre recherche."}
          </div>
          {sites.length === 0 && <button onClick={onNew} style={btnPrimary()}><Plus size={15} /> Ajouter un site</button>}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((s) => {
            const days = daysUntil(s._prochaine);
            const urgentColor = days !== null && days <= 30 ? "#EF4444" : days !== null && days <= 60 ? "#FB923C" : "#5B6B7D";
            return (
              <div key={s.id} onClick={() => onOpen(s.id)} className="site-row"
                style={{ background: "#FFFFFF", border: "1px solid #D8DEE5", borderRadius: 12, padding: "13px 16px", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#9AA5B1")} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#D8DEE5")}
              >
                <div className="site-row-main" style={{ flex: "1 1 220px", minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1A1F26", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.nom || "Site sans nom"}</div>
                  <div style={{ fontSize: 12, color: "#5B6B7D" }}>{[s.client, s.local].filter(Boolean).join(" · ") || "Client non renseigné"}</div>
                </div>
                <div className="site-row-meta hide-mobile" style={{ flex: "0 0 130px", fontSize: 12 }}>
                  <div style={{ color: "#8B96A3", fontSize: 10.5, textTransform: "uppercase", fontWeight: 600 }}>Intervenant</div>
                  <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.rapport.intervenant || "—"}</div>
                </div>
                <div className="site-row-meta" style={{ flex: "0 0 150px", fontSize: 12, color: urgentColor, fontWeight: 600 }}>
                  <div style={{ color: "#8B96A3", fontSize: 10.5, textTransform: "uppercase", fontWeight: 600 }}>Prochaine maint.</div>
                  {s._prochaine} {days !== null && <span style={{ fontWeight: 500 }}>({days < 0 ? `${-days}j retard` : `${days}j`})</span>}
                </div>
                <div className="site-row-meta" style={{ flex: "0 0 90px" }}><StatusBadge label={rankToLabel(s._rank)} /></div>
                <ChevronRight size={16} color="#9AA5B1" className="hide-mobile" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   Onglet Rapport
   ========================================================================= */
function RapportTab({ site, update }) {
  const r = site.rapport;
  const set = (k, v) => update((d) => ({ ...d, rapport: { ...d.rapport, [k]: v } }));

  function actualiserFonctionnement() {
    const rang = Math.max(0, worstRank(site.equipements.map((e) => e.etatFinal)));
    set("fonctionnementEtat", LISTE_ETAT_INSTALLATION[rang]);
  }
  function compilerRemarques() {
    const lignes = site.equipements
      .filter((e) => e.remarques && e.remarques.trim())
      .map((e) => `${e.type}${e.identification.repere ? " (" + e.identification.repere + ")" : ""} : ${e.remarques.trim()}`);
    set("syntheseRemarques", lignes.length ? lignes.join("\n") : "Aucune remarque particulière relevée sur les équipements.");
  }

  return (
    <>
    <Card>
      <SectionTitle>Intervention</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        <Field label="Date"><TextInput type="date" value={r.date} onChange={(e) => set("date", e.target.value)} /></Field>
        <Field label="Intervenant">
          <Combo value={r.intervenant} onChange={(v) => set("intervenant", v)} options={LISTE_INTERVENANTS} listId={`${site.id}-intervenant`} />
        </Field>
        <Field label="Heure d'arrivée"><TextInput type="time" value={r.heureArrivee} onChange={(e) => set("heureArrivee", e.target.value)} /></Field>
        <Field label="Heure de fin"><TextInput type="time" value={r.heureFin} onChange={(e) => set("heureFin", e.target.value)} /></Field>
      </div>

      <SectionTitle>Caractéristiques de l'installation</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        <Field label="Marque">
          <Combo value={r.marque} onChange={(v) => set("marque", v)} options={LISTE_MARQUES} listId={`${site.id}-marque`} />
        </Field>
        <Field label="Année de mise en service"><TextInput value={r.anneeMiseEnService} onChange={(e) => set("anneeMiseEnService", e.target.value)} /></Field>
        <Field label="Courant assigné (Ir, A)">
          <Combo value={r.courantAssigne} onChange={(v) => set("courantAssigne", v)} options={LISTE_COURANT_ASSIGNE} listId={`${site.id}-courant`} numeric />
        </Field>
        <Field label="Tension assignée (Ur, kV)">
          <Combo value={r.tensionAssignee} onChange={(v) => set("tensionAssignee", v)} options={LISTE_TENSION_ASSIGNEE} listId={`${site.id}-tension`} numeric />
        </Field>
        <Field label="Nombre d'équipements" span={2}><TextInput type="number" min="0" value={r.nombreEquipements} onChange={(e) => set("nombreEquipements", e.target.value)} /></Field>
        <Field label="Prochaine maintenance recommandée avant" span={2}><TextInput type="date" value={r.prochaineMaintenance} onChange={(e) => set("prochaineMaintenance", e.target.value)} /></Field>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <SectionTitle>État de l'installation</SectionTitle>
        <button onClick={actualiserFonctionnement} style={btnGhost(BRAND.blue)} title="Applique le pire état constaté parmi les équipements">
          <RotateCcw size={13} /> Actualiser depuis les équipements
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 24 }}>
        <Field label="Environnement">
          <Select value={r.environnementEtat} onChange={(e) => set("environnementEtat", e.target.value)} style={{ marginBottom: 8 }}>
            {LISTE_ETAT_INSTALLATION.map((o) => <option key={o} value={o}>{o}</option>)}
          </Select>
          <TextArea value={r.environnementRemarque} onChange={(e) => set("environnementRemarque", e.target.value)} placeholder="Remarque" />
        </Field>
        <Field label="Fonctionnement de l'installation">
          <Select value={r.fonctionnementEtat} onChange={(e) => set("fonctionnementEtat", e.target.value)} style={{ marginBottom: 8 }}>
            {LISTE_ETAT_INSTALLATION.map((o) => <option key={o} value={o}>{o}</option>)}
          </Select>
          <TextArea value={r.fonctionnementRemarque} onChange={(e) => set("fonctionnementRemarque", e.target.value)} placeholder="Remarque" />
        </Field>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 6 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: "#5B6B7D", letterSpacing: 0.5, textTransform: "uppercase" }}>Synthèse des remarques et préconisations</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={compilerRemarques} style={btnGhost(BRAND.blue)} title="Reprend les remarques saisies sur chaque équipement">
            <RotateCcw size={13} /> Compiler les remarques des équipements
          </button>
          <button onClick={() => set("syntheseRemarques", REMARQUE_STANDARD_INSTALLATION)} style={btnGhost("#0F8A5F")} title="Insère une remarque type pour une installation conforme">
            <CheckCircle2 size={13} /> Remarque standard (conforme)
          </button>
        </div>
      </div>
      <TextArea value={r.syntheseRemarques} onChange={(e) => set("syntheseRemarques", e.target.value)} style={{ minHeight: 100 }} />
    </Card>
    <div style={{ marginTop: 14 }}>
      <PhotoGallery photos={r.photos} onChange={(p) => set("photos", p)} idPrefix={`${site.id}-rapport`} />
    </div>
    </>
  );
}

/* =========================================================================
   Onglet équipement — schéma complet des contrôles
   ========================================================================= */
/* ---- Panneau spécialisé : essais de déclenchement avec tolérance calculée depuis le paramétrage du relais ---- */
function MiniField({ label, unit, children }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#8B96A3" }}>
      {label}
      {children}
      {unit && <span>{unit}</span>}
    </label>
  );
}
function MiniInputUnit({ label, value, unit, onValueChange, onUnitChange }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#8B96A3" }}>
      {label}
      <NumberWithUnit value={value} unit={unit} onValueChange={onValueChange} onUnitChange={onUnitChange} />
    </label>
  );
}
function MiniComputed({ label, unit, value }) {
  return (
    <MiniField label={label} unit={unit}>
      <span style={{ ...inputStyle, width: 74, padding: "5px 7px", fontSize: 12, background: "#EEF2F6", color: "#0A5DA8", fontWeight: 700, display: "inline-block", textAlign: "center" }}>
        {value === null || value === undefined || Number.isNaN(value) ? "—" : value}
      </span>
    </MiniField>
  );
}
function MiniInput({ label, unit, value, onChange, width }) {
  return (
    <MiniField label={label} unit={unit}>
      <input type="number" step="any" value={value ?? ""} onChange={(e) => onChange(e.target.value)} style={{ ...inputStyle, width: width || 70, padding: "5px 7px", fontSize: 12 }} />
    </MiniField>
  );
}
function MiniSelect({ label, options, value, onChange }) {
  return (
    <MiniField label={label}>
      <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} style={{ ...inputStyle, width: 90, padding: "5px 7px", fontSize: 12 }}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </MiniField>
  );
}
function MiniCombo({ label, options, value, onChange, listId }) {
  return (
    <MiniField label={label}>
      <Combo value={value} onChange={onChange} options={options} listId={listId} style={{ width: 90, padding: "5px 7px", fontSize: 12 }} />
    </MiniField>
  );
}

// Analyse d'huile : liste des analyses possibles à cocher — seules celles cochées affichent
// leur(s) champ(s) de résultat.
function AnalyseHuilePanel({ eq, update, idPrefix }) {
  const schema = SCHEMAS["Analyse d'huile"];
  const items = schema.sections[0].items;
  const values = eq.controles.resultats;
  const setField = (key, fieldKey, v) =>
    update({ ...eq, controles: { ...eq.controles, resultats: { ...values, [key]: { ...values[key], fields: { ...values[key].fields, [fieldKey]: v } } } } });
  const toggleRealise = (key, checked) => setField(key, "realise", checked ? "OUI" : "");
  const setEtat = (key, etat) => update({ ...eq, controles: { ...eq.controles, resultats: { ...values, [key]: { ...values[key], etat } } } });

  return (
    <Card style={{ marginBottom: 14 }}>
      <SectionTitle>Résultats d'analyse</SectionTitle>
      <div>
        {items.map((item) => {
          const v = values[item.key];
          const checked = v.fields.realise === "OUI";
          return (
            <div key={item.key} style={{ padding: "10px 0", borderBottom: "1px solid #E2E6EB" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
                <input type="checkbox" checked={checked} onChange={(e) => toggleRealise(item.key, e.target.checked)} style={{ width: 16, height: 16, accentColor: BRAND.blue, cursor: "pointer" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1F26" }}>{item.label}</span>
              </label>
              {checked && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginTop: 10, marginLeft: 25 }}>
                  {item.fields.map((f) => (
                    <label key={f.key} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#5B6B7D" }}>
                      {f.label}
                      {f.options ? (
                        <Combo value={v.fields[f.key]} onChange={(val) => setField(item.key, f.key, val)} options={f.options} listId={`${idPrefix}-${item.key}-${f.key}`} style={{ width: 130, padding: "5px 7px", fontSize: 12 }} />
                      ) : f.unit ? (
                        <NumberWithUnit value={v.fields[f.key]} unit={v.fields[f.key + "Unite"] || f.unit} onValueChange={(val) => setField(item.key, f.key, val)} onUnitChange={(u) => setField(item.key, f.key + "Unite", u)} />
                      ) : (
                        <input value={v.fields[f.key] ?? ""} onChange={(e) => setField(item.key, f.key, e.target.value)} style={{ ...inputStyle, width: 90, padding: "5px 7px", fontSize: 12 }} />
                      )}
                    </label>
                  ))}
                  <Select value={v.etat} onChange={(e) => setEtat(item.key, e.target.value)} style={{ width: 130, padding: "5px 7px", fontSize: 12 }}>
                    {EQUIP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function ParametrageRelaisPanel({ eq, update, idPrefix }) {
  const seuils = eq.controles.parametrage_relais_seuils;
  const setSeuils = (next) => update({ ...eq, controles: { ...eq.controles, parametrage_relais_seuils: next } });
  const setSeuilField = (id, k, v) => setSeuils(seuils.map((s) => (s.id === id ? { ...s, fields: { ...s.fields, [k]: v } } : s)));
  const setSeuilLabel = (id, label) => setSeuils(seuils.map((s) => (s.id === id ? { ...s, label } : s)));
  const removeSeuil = (id) => setSeuils(seuils.filter((s) => s.id !== id));
  function addSeuil() {
    const used = seuils.map((s) => s.label);
    const remaining = PARAM_SEUIL_TYPES.filter((t) => !used.includes(t));
    setSeuils([...seuils, emptySeuilEntry(remaining[0] || "")]);
  }

  return (
    <Card style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <SectionTitle>Paramétrage du relais de protection</SectionTitle>
        <button onClick={addSeuil} style={btnGhost(BRAND.amber)}><Plus size={13} /> Ajouter un seuil</button>
      </div>
      {seuils.length === 0 ? (
        <div style={{ textAlign: "center", padding: 18, color: "#8B96A3", fontSize: 12.5, border: "1px dashed #D8DEE5", borderRadius: 10 }}>
          Aucun seuil paramétré
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {seuils.map((s) => {
            const used = seuils.filter((x) => x.id !== s.id).map((x) => x.label);
            const options = PARAM_SEUIL_TYPES.filter((t) => !used.includes(t));
            return (
              <div key={s.id} style={{ padding: "10px 0", borderBottom: "1px solid #E2E6EB" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                  <div style={{ flex: "1 1 220px" }}>
                    <Combo value={s.label} onChange={(v) => setSeuilLabel(s.id, v)} options={options} listId={`${idPrefix}-seuil-${s.id}`} placeholder="Type de seuil (ou saisie libre)" />
                  </div>
                  <button onClick={() => removeSeuil(s.id)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: 4 }} title="Retirer ce seuil">
                    <Trash2 size={15} />
                  </button>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <MiniSelect label="État" options={LISTE_ETAT_SEUIL} value={s.fields.etat} onChange={(v) => setSeuilField(s.id, "etat", v)} />
                  <MiniSelect label="Courbe à temps" options={LISTE_COURBE_RELAIS} value={s.fields.courbe} onChange={(v) => setSeuilField(s.id, "courbe", v)} />
                  <MiniSelect label="Type" options={LISTE_TYPE_RELAIS} value={s.fields.type} onChange={(v) => setSeuilField(s.id, "type", v)} />
                  <MiniInput label="Réglage" unit="A" value={s.fields.reglage} onChange={(v) => setSeuilField(s.id, "reglage", v)} />
                  <MiniInput label="Temporisation" value={s.fields.temporisation} onChange={(v) => setSeuilField(s.id, "temporisation", v)} />
                  <MiniSelect label="Unité" options={LISTE_TEMPO_UNITE} value={s.fields.temporisation_unite} onChange={(v) => setSeuilField(s.id, "temporisation_unite", v)} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

function DisjoncteurRelaisPanel({ eq, update, custom, onAddCustom, onChangeCustom, onRemoveCustom, idPrefix }) {
  const seuils = eq.controles.parametrage_relais_seuils;
  const circuit = eq.controles.controles_relais.circuit_mesures_commande;
  const setEssaiField = (seuilId, k, v) =>
    update({ ...eq, controles: { ...eq.controles, parametrage_relais_seuils: seuils.map((s) => (s.id === seuilId ? { ...s, essai: { ...s.essai, fields: { ...s.essai.fields, [k]: v } } } : s)) } });
  const setEssai = (seuilId, patch) =>
    update({ ...eq, controles: { ...eq.controles, parametrage_relais_seuils: seuils.map((s) => (s.id === seuilId ? { ...s, essai: { ...s.essai, ...patch } } : s)) } });
  const setCircuit = (patch) => update({ ...eq, controles: { ...eq.controles, controles_relais: { ...eq.controles.controles_relais, circuit_mesures_commande: { ...circuit, ...patch } } } });
  const renseignes = seuils.filter((s) => s.label);

  return (
    <Card style={{ marginBottom: 14 }}>
      <SectionTitle>Contrôles du relais de protection</SectionTitle>
      <div>
        {renseignes.length === 0 && (
          <div style={{ textAlign: "center", padding: 18, color: "#8B96A3", fontSize: 12.5, border: "1px dashed #D8DEE5", borderRadius: 10, marginBottom: 10 }}>
            Ajoutez un seuil dans le paramétrage du relais pour faire apparaître son essai ici.
          </div>
        )}
        {renseignes.map((s) => {
          const tol = calcToleranceEssai(s.fields.temporisation, s.fields.temporisation_unite);
          return (
            <div key={s.id} style={{ padding: "10px 0", borderBottom: "1px solid #E2E6EB" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12.5, color: "#3E4A5C", flex: "1 1 240px" }}>Essai de déclenchement — {s.label}</span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <MiniInput label="L1" value={s.essai.fields.l1} onChange={(v) => setEssaiField(s.id, "l1", v)} />
                  <MiniInput label="L2" value={s.essai.fields.l2} onChange={(v) => setEssaiField(s.id, "l2", v)} />
                  <MiniInput label="L3" value={s.essai.fields.l3} onChange={(v) => setEssaiField(s.id, "l3", v)} />
                  <MiniInput label="Courant injecté" unit="A" value={s.essai.fields.courant_injecte} onChange={(v) => setEssaiField(s.id, "courant_injecte", v)} />
                  {tol && <MiniComputed label="Tolérance attendue" unit={tol.unite} value={`${tol.min} – ${tol.max}`} />}
                  <input placeholder="Action" value={s.essai.action} onChange={(e) => setEssai(s.id, { action: e.target.value })} style={{ ...inputStyle, width: 150, padding: "5px 7px", fontSize: 12 }} />
                  <Select value={s.essai.etat} onChange={(e) => setEssai(s.id, { etat: e.target.value })} style={{ width: 120, padding: "5px 7px", fontSize: 12 }}>
                    {EQUIP_STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
                  </Select>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ padding: "10px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12.5, color: "#3E4A5C", flex: "1 1 240px" }}>Contrôle du circuit de mesures et commande</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <input placeholder="Action" value={circuit.action} onChange={(e) => setCircuit({ action: e.target.value })} style={{ ...inputStyle, width: 150, padding: "5px 7px", fontSize: 12 }} />
              <Select value={circuit.etat} onChange={(e) => setCircuit({ etat: e.target.value })} style={{ width: 120, padding: "5px 7px", fontSize: 12 }}>
                {EQUIP_STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
              </Select>
            </div>
          </div>
        </div>
      </div>
      {custom && <CustomActionsList custom={custom} onAdd={onAddCustom} onChange={onChangeCustom} onRemove={onRemoveCustom} idPrefix={idPrefix} />}
    </Card>
  );
}

/* ---- Panneau spécialisé BRK : réglages et tests du disjoncteur avec calculs Ir / Im / valises ---- */
function BRKReglagePanel({ eq, update, custom, onAddCustom, onChangeCustom, onRemoveCustom, idPrefix }) {
  const reglage = eq.controles.reglage_disjoncteur;
  const tests = eq.controles.tests_disjoncteur;
  const setR = (itemKey, fieldKey, v) => update({ ...eq, controles: { ...eq.controles, reglage_disjoncteur: { ...reglage, [itemKey]: { ...reglage[itemKey], fields: { ...reglage[itemKey].fields, [fieldKey]: v } } } } });
  const setT = (itemKey, fieldKey, v) => update({ ...eq, controles: { ...eq.controles, tests_disjoncteur: { ...tests, [itemKey]: { ...tests[itemKey], fields: { ...tests[itemKey].fields, [fieldKey]: v } } } } });
  const setTEtat = (itemKey, etat) => update({ ...eq, controles: { ...eq.controles, tests_disjoncteur: { ...tests, [itemKey]: { ...tests[itemKey], etat } } } });

  const sl = reglage.surcharge_longue.fields;
  const cc = reglage.cc_temporise.fields;
  const inst = reglage.instantane.fields;
  const n = (v) => { const x = parseFloat(v); return isNaN(x) ? 0 : x; };

  const Ir = n(sl.inominal) * n(sl.k1) * n(sl.k2);
  const Im = (cc.im_fonction_de === "In" ? n(sl.inominal) : Ir) * n(cc.k);

  const tSL = tests.test_surcharge_longue.fields;
  const tCC = tests.test_cc_temporise.fields;
  const testASL = n(tSL.test_a) || 1.5;
  const testACC = n(tCC.test_a) || 1.2;

  const valiseSTR_SL = Math.round(n(sl.k1) * n(sl.k2) * testASL * 100);
  const valiseIS_SL = Math.round(Ir * testASL);
  const valiseSTR_CC = Math.round(n(sl.k1) * n(sl.k2) * testACC * n(cc.k) * 100);
  const valiseIS_CC = Math.round(Ir * n(cc.k) * testACC);
  const valiseIS_Inst = Math.round(n(inst.ii) * 1000 * 1.3);

  return (
    <>
      <Card style={{ marginBottom: 14 }}>
        <SectionTitle>Réglage du disjoncteur</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", padding: "8px 0", borderBottom: "1px solid #E2E6EB" }}>
            <span style={{ fontSize: 12.5, color: "#3E4A5C", flex: "1 1 160px" }}>Surcharge longue</span>
            <MiniInputUnit label="I nominal" value={sl.inominal} unit={sl.inominalUnite || "A"} onValueChange={(v) => setR("surcharge_longue", "inominal", v)} onUnitChange={(u) => setR("surcharge_longue", "inominalUnite", u)} />
            <MiniInput label="K1" value={sl.k1} onChange={(v) => setR("surcharge_longue", "k1", v)} />
            <MiniInput label="K2" value={sl.k2} onChange={(v) => setR("surcharge_longue", "k2", v)} />
            <MiniInputUnit label="Ineutre" value={sl.ineutre} unit={sl.ineutreUnite || "A"} onValueChange={(v) => setR("surcharge_longue", "ineutre", v)} onUnitChange={(u) => setR("surcharge_longue", "ineutreUnite", u)} />
            <MiniSelect label="tr" options={LISTE_TR_MODE} value={sl.tr_mode} onChange={(v) => setR("surcharge_longue", "tr_mode", v)} />
            <MiniInput label="tr" unit="s" value={sl.tr} onChange={(v) => setR("surcharge_longue", "tr", v)} />
            <MiniCombo label="à (x Ir)" options={LISTE_TR_CLASSE} value={sl.tr_classe} onChange={(v) => setR("surcharge_longue", "tr_classe", v)} listId="brk-tr-classe" />
            <MiniComputed label="Ir (calculé)" unit="A" value={Ir || null} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", padding: "8px 0", borderBottom: "1px solid #E2E6EB" }}>
            <span style={{ fontSize: 12.5, color: "#3E4A5C", flex: "1 1 160px" }}>Court-circuit temporisé</span>
            <MiniSelect label="Im fonction de" options={["Ir", "In"]} value={cc.im_fonction_de || "Ir"} onChange={(v) => setR("cc_temporise", "im_fonction_de", v)} />
            <MiniInput label="K" value={cc.k} onChange={(v) => setR("cc_temporise", "k", v)} />
            <MiniInput label="tsd" unit="ms" value={cc.tsd} onChange={(v) => setR("cc_temporise", "tsd", v)} />
            <MiniInput label="I²t" value={cc.i2t} onChange={(v) => setR("cc_temporise", "i2t", v)} />
            <MiniComputed label="Im (calculé)" unit="A" value={Im || null} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", padding: "8px 0", borderBottom: "1px solid #E2E6EB" }}>
            <span style={{ fontSize: 12.5, color: "#3E4A5C", flex: "1 1 160px" }}>Instantané</span>
            <MiniInputUnit label="Ii" value={inst.ii} unit={inst.iiUnite || "kA"} onValueChange={(v) => setR("instantane", "ii", v)} onUnitChange={(u) => setR("instantane", "iiUnite", u)} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", padding: "8px 0" }}>
            <span style={{ fontSize: 12.5, color: "#3E4A5C", flex: "1 1 160px" }}>Pouvoir de coupure</span>
            <MiniInputUnit label="Icu" value={reglage.pouvoir_coupure.fields.icu} unit={reglage.pouvoir_coupure.fields.icuUnite || "kA"} onValueChange={(v) => setR("pouvoir_coupure", "icu", v)} onUnitChange={(u) => setR("pouvoir_coupure", "icuUnite", u)} />
          </div>
        </div>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <SectionTitle>Tests du disjoncteur</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", padding: "8px 0", borderBottom: "1px solid #E2E6EB" }}>
            <span style={{ fontSize: 12.5, color: "#3E4A5C", flex: "1 1 160px" }}>Surcharge longue</span>
            <MiniInput label="Test à" unit="x Ir" value={tSL.test_a} onChange={(v) => setT("test_surcharge_longue", "test_a", v)} />
            <MiniInput label="Tr max attendu" unit="x Ir" value={tSL.tr_max} onChange={(v) => setT("test_surcharge_longue", "tr_max", v)} />
            <MiniComputed label="Valise STR" unit="mA" value={valiseSTR_SL} />
            <MiniComputed label="Valise IS" unit="A" value={valiseIS_SL} />
            <MiniInput label="Déclenchement" unit="s" value={tSL.declenchement} onChange={(v) => setT("test_surcharge_longue", "declenchement", v)} />
            <Select value={tests.test_surcharge_longue.etat} onChange={(e) => setTEtat("test_surcharge_longue", e.target.value)} style={{ width: 130, padding: "5px 7px", fontSize: 12 }}>
              {EQUIP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", padding: "8px 0", borderBottom: "1px solid #E2E6EB" }}>
            <span style={{ fontSize: 12.5, color: "#3E4A5C", flex: "1 1 160px" }}>Court-circuit temporisé</span>
            <MiniInput label="Test à" unit="x Im" value={tCC.test_a} onChange={(v) => setT("test_cc_temporise", "test_a", v)} />
            <MiniComputed label="Valise STR" unit="mA" value={valiseSTR_CC} />
            <MiniComputed label="Valise IS" unit="A" value={valiseIS_CC} />
            <MiniInput label="Décl. à T=0" unit="ms" value={tCC.declenchement_t0} onChange={(v) => setT("test_cc_temporise", "declenchement_t0", v)} />
            <MiniInput label="Décl. à T réglé" unit="ms" value={tCC.declenchement_treg} onChange={(v) => setT("test_cc_temporise", "declenchement_treg", v)} />
            <Select value={tests.test_cc_temporise.etat} onChange={(e) => setTEtat("test_cc_temporise", e.target.value)} style={{ width: 130, padding: "5px 7px", fontSize: 12 }}>
              {EQUIP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", padding: "8px 0" }}>
            <span style={{ fontSize: 12.5, color: "#3E4A5C", flex: "1 1 160px" }}>Instantané</span>
            <MiniInput label="Valise STR" unit="mA" value={tests.test_instantane.fields.valise_str} onChange={(v) => setT("test_instantane", "valise_str", v)} />
            <MiniComputed label="Valise IS" unit="A" value={valiseIS_Inst} />
            <MiniInput label="Déclenchement" unit="ms" value={tests.test_instantane.fields.declenchement} onChange={(v) => setT("test_instantane", "declenchement", v)} />
            <Select value={tests.test_instantane.etat} onChange={(e) => setTEtat("test_instantane", e.target.value)} style={{ width: 130, padding: "5px 7px", fontSize: 12 }}>
              {EQUIP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>
        </div>
        {custom && <CustomActionsList custom={custom} onAdd={onAddCustom} onChange={onChangeCustom} onRemove={onRemoveCustom} idPrefix={idPrefix} />}
      </Card>
    </>
  );
}

// Parcourt tous les contrôles d'un équipement (y compris seuils dynamiques, essais liés,
// et analyses d'huile cochées) et relève ceux dont l'état n'est pas "Conforme".
function collectAnomalies(eq) {
  const schema = SCHEMAS[eq.type];
  const isRelais = TYPES_AVEC_RELAIS.includes(eq.type);
  const lines = [];
  schema.sections.forEach((sec) => {
    if (isRelais && sec.key === "parametrage_relais") return;
    if (isRelais && sec.key === "controles_relais") {
      (eq.controles.parametrage_relais_seuils || []).filter((s) => s.label).forEach((s) => {
        if (s.essai.etat && RANK_OF[s.essai.etat] > 0) lines.push(`Essai de déclenchement — ${s.label} : ${s.essai.etat}`);
      });
      const circuit = eq.controles.controles_relais.circuit_mesures_commande;
      if (circuit && circuit.etat && RANK_OF[circuit.etat] > 0) lines.push(`Contrôle du circuit de mesures et commande : ${circuit.etat}`);
      return;
    }
    if (eq.type === "Analyse d'huile" && sec.key === "resultats") {
      sec.items.forEach((item) => {
        const v = eq.controles[sec.key][item.key];
        if (v.fields.realise === "OUI" && v.etat && RANK_OF[v.etat] > 0) lines.push(`${item.label} : ${v.etat}`);
      });
      return;
    }
    sec.items.forEach((item) => {
      const v = eq.controles[sec.key][item.key];
      if (v && v.etat !== undefined && RANK_OF[v.etat] > 0) lines.push(`${item.label} : ${v.etat}`);
    });
    (eq.controles[sec.key + "__custom"] || []).forEach((c) => {
      if (c.etat && RANK_OF[c.etat] > 0) lines.push(`${c.label || "(action ajoutée)"} : ${c.etat}`);
    });
  });
  return lines;
}

function EquipementCard({ eq, update, remove, removable = true }) {
  const [open, setOpen] = useState(true);
  const schema = SCHEMAS[eq.type];
  const setIdentification = (k, v) => update({ ...eq, identification: { ...eq.identification, [k]: v } });
  const setControleItem = (sectionKey, itemKey, v) =>
    update({ ...eq, controles: { ...eq.controles, [sectionKey]: { ...eq.controles[sectionKey], [itemKey]: v } } });
  const addCustomAction = (sectionKey) =>
    update({ ...eq, controles: { ...eq.controles, [sectionKey + "__custom"]: [...(eq.controles[sectionKey + "__custom"] || []), { id: uid(), label: "", action: "", etat: "Conforme" }] } });
  const changeCustomAction = (sectionKey, id, patch) =>
    update({ ...eq, controles: { ...eq.controles, [sectionKey + "__custom"]: eq.controles[sectionKey + "__custom"].map((c) => (c.id === id ? { ...c, ...patch } : c)) } });
  const removeCustomAction = (sectionKey, id) =>
    update({ ...eq, controles: { ...eq.controles, [sectionKey + "__custom"]: eq.controles[sectionKey + "__custom"].filter((c) => c.id !== id) } });

  const titleField = schema.identification[0];
  const subtitleField = schema.identification.find((f) => f.key.toLowerCase().includes("numeroserie")) || schema.identification[1];

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => setOpen((o) => !o)}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ChevronDown size={15} color="#8B96A3" style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform .15s" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1F26" }}>
            {titleField ? eq.identification[titleField.key] || eq.type : eq.type}
            {titleField && subtitleField && eq.identification[subtitleField.key] && (
              <span style={{ color: "#5B6B7D", fontWeight: 400 }}> · {eq.identification[subtitleField.key]}</span>
            )}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} onClick={(e) => e.stopPropagation()}>
          <StatusBadge label={eq.etatFinal} size="sm" gender={equipGender(eq.type)} />
          {removable && (
            <button onClick={remove} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: 4 }} title="Supprimer cet équipement">
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>

      {open && (
        <div style={{ marginTop: 16 }}>
          {schema.identification.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <SectionTitle>Identification</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
                {schema.identification.map((f) => (
                  <Field key={f.key} label={f.label}>
                    {f.options ? (
                      <Combo
                        value={eq.identification[f.key]}
                        onChange={(v) => setIdentification(f.key, v)}
                        options={f.options}
                        listId={`${eq.id}-ident-${f.key}`}
                      />
                    ) : f.numeric ? (
                      <TextInput type="number" step="any" value={eq.identification[f.key] || ""} onChange={(e) => setIdentification(f.key, e.target.value)} />
                    ) : (
                      <TextInput value={eq.identification[f.key] || ""} onChange={(e) => setIdentification(f.key, e.target.value)} />
                    )}
                  </Field>
                ))}
              </div>
            </div>
          )}

          {schema.sections.map((sec) => {
            if (sec.key === "parametrage_relais" && TYPES_AVEC_RELAIS.includes(eq.type)) {
              return <ParametrageRelaisPanel key={sec.key} eq={eq} update={update} idPrefix={`${eq.id}-${sec.key}`} />;
            }
            if (sec.key === "controles_relais" && TYPES_AVEC_RELAIS.includes(eq.type)) {
              return (
                <DisjoncteurRelaisPanel
                  key={sec.key}
                  eq={eq}
                  update={update}
                  custom={eq.controles[sec.key + "__custom"] || []}
                  onAddCustom={() => addCustomAction(sec.key)}
                  onChangeCustom={(id, patch) => changeCustomAction(sec.key, id, patch)}
                  onRemoveCustom={(id) => removeCustomAction(sec.key, id)}
                  idPrefix={`${eq.id}-${sec.key}`}
                />
              );
            }
            if (eq.type === "Disjoncteur BT" && sec.key === "reglage_disjoncteur") {
              return (
                <BRKReglagePanel
                  key="brk-reglage"
                  eq={eq}
                  update={update}
                  custom={eq.controles["tests_disjoncteur__custom"] || []}
                  onAddCustom={() => addCustomAction("tests_disjoncteur")}
                  onChangeCustom={(id, patch) => changeCustomAction("tests_disjoncteur", id, patch)}
                  onRemoveCustom={(id) => removeCustomAction("tests_disjoncteur", id)}
                  idPrefix={`${eq.id}-brk`}
                />
              );
            }
            if (eq.type === "Disjoncteur BT" && sec.key === "tests_disjoncteur") {
              return null; // rendu conjointement par BRKReglagePanel ci-dessus
            }
            if (eq.type === "Disjoncteur BT" && sec.key === "courbe_declenchement") {
              return (
                <SectionBlock
                  key={sec.key}
                  title={sec.title}
                  items={sec.items}
                  values={eq.controles[sec.key]}
                  onChangeItem={(itemKey, v) => setControleItem(sec.key, itemKey, v)}
                  idPrefix={`${eq.id}-${sec.key}`}
                  custom={eq.controles[sec.key + "__custom"] || []}
                  onAddCustom={() => addCustomAction(sec.key)}
                  onChangeCustom={(id, patch) => changeCustomAction(sec.key, id, patch)}
                  onRemoveCustom={(id) => removeCustomAction(sec.key, id)}
                  extra={<FileGallery files={eq.courbeFiles} onChange={(files) => update({ ...eq, courbeFiles: files })} idPrefix={`${eq.id}-courbe`} />}
                />
              );
            }
            if (eq.type === "Analyse d'huile" && sec.key === "resultats") {
              return (
                <React.Fragment key={sec.key}>
                  <AnalyseHuilePanel eq={eq} update={update} idPrefix={`${eq.id}-${sec.key}`} />
                  <Card style={{ marginBottom: 14 }}>
                    <FileGallery files={eq.rapportLaboFiles} onChange={(files) => update({ ...eq, rapportLaboFiles: files })} idPrefix={`${eq.id}-labo`} />
                  </Card>
                </React.Fragment>
              );
            }
            return (
              <SectionBlock
                key={sec.key}
                title={sec.title}
                items={sec.items}
                values={eq.controles[sec.key]}
                onChangeItem={(itemKey, v) => setControleItem(sec.key, itemKey, v)}
                idPrefix={`${eq.id}-${sec.key}`}
                custom={eq.controles[sec.key + "__custom"] || []}
                onAddCustom={() => addCustomAction(sec.key)}
                onChangeCustom={(id, patch) => changeCustomAction(sec.key, id, patch)}
                onRemoveCustom={(id) => removeCustomAction(sec.key, id)}
              />
            );
          })}

          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 14, alignItems: "start" }}>
              <Field label="Synthèse de l'état — à l'issue de la maintenance">
                <Select value={eq.etatFinal} onChange={(e) => update({ ...eq, etatFinal: e.target.value })}>
                  {EQUIP_STATUSES.map((s) => <option key={s} value={s}>{agree(s, equipGender(eq.type), false)}</option>)}
                </Select>
              </Field>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#5B6B7D", letterSpacing: 0.5, textTransform: "uppercase" }}>Remarques et préconisations</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                      onClick={() => {
                        const anomalies = collectAnomalies(eq);
                        update({ ...eq, remarques: anomalies.length ? anomalies.join("\n") : "Aucune anomalie relevée." });
                      }}
                      style={btnGhost(BRAND.blue)}
                      title="Reprend les contrôles non conformes de cet équipement"
                    >
                      <RotateCcw size={13} /> Compiler les anomalies
                    </button>
                    <button
                      onClick={() => update({ ...eq, remarques: REMARQUE_STANDARD_EQUIPEMENT })}
                      style={btnGhost("#0F8A5F")}
                      title="Insère une remarque type pour un équipement conforme"
                    >
                      <CheckCircle2 size={13} /> Remarque standard (conforme)
                    </button>
                  </div>
                </div>
                <TextArea value={eq.remarques} onChange={(e) => update({ ...eq, remarques: e.target.value })} />
              </div>
            </div>
          </Card>

          <div style={{ marginTop: 14 }}>
            <PhotoGallery photos={eq.photos} onChange={(p) => update({ ...eq, photos: p })} idPrefix={eq.id} />
          </div>
        </div>
      )}
    </Card>
  );
}

function EquipementTypeTab({ type, site, update }) {
  const items = site.equipements.filter((e) => e.type === type);
  const updateItem = (id, next) => update((d) => ({ ...d, equipements: d.equipements.map((e) => (e.id === id ? next : e)) }));
  const removeItem = (id) => update((d) => ({ ...d, equipements: d.equipements.filter((e) => e.id !== id) }));
  const addItem = () => update((d) => ({ ...d, equipements: [...d.equipements, emptyEquipement(type)] }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={addItem} style={btnGhost("#FFC107")}><Plus size={13} /> Ajouter un {type.toLowerCase()}</button>
      </div>
      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, background: "#FFFFFF", border: "1px dashed #D8DEE5", borderRadius: 14, color: "#8B96A3", fontSize: 13 }}>
          Aucun équipement de type « {type} » enregistré pour ce site.
        </div>
      ) : (
        items.map((eq) => <EquipementCard key={eq.id} eq={eq} update={(next) => updateItem(eq.id, next)} remove={() => removeItem(eq.id)} />)
      )}
    </div>
  );
}

/* =========================================================================
   Fiche site (onglets)
   ========================================================================= */
/* =========================================================================
   Rapport imprimable (export Word)
   ========================================================================= */
function printFieldParts(item, value) {
  const parts = [];
  (item.fields || []).forEach((f) => {
    const v = f.compute ? f.compute(value.fields) : value.fields ? value.fields[f.key] : "";
    const unitKey = f.unitFrom ? f.unitFrom + "Unite" : f.key + "Unite";
    const unit = f.unit ? (value.fields && value.fields[unitKey]) || f.unit : "";
    if (v !== "" && v !== null && v !== undefined) parts.push(`${f.label} : ${v}${unit ? " " + unit : ""}`);
  });
  return parts;
}

const PRINT_ETAT_COLOR = { "Conforme": "#0F8A5F", "Dégradé": "#B5730A", "Défaillant": "#C0392B" };
function printEtatColor(label) {
  const rank = RANK_OF[label];
  if (rank === 2) return "#C0392B";
  if (rank === 1) return "#B5730A";
  if (rank === -1) return "#7A8794";
  return "#0F8A5F";
}

function PrintControlLine({ item, value, extraParts }) {
  const parts = extraParts || printFieldParts(item, value);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "5px 0", borderBottom: "1px solid #e5e5e5", fontSize: 11 }}>
      <div style={{ flex: "1 1 260px" }}>
        <div>{item.label}</div>
        {parts.length > 0 && <div style={{ color: "#666", fontSize: 10 }}>{parts.join(" · ")}</div>}
        {value.action ? <div style={{ color: "#666", fontSize: 10 }}>Action : {value.action}</div> : null}
      </div>
      {value.etat !== undefined && (
        <div style={{
          fontWeight: 700, fontSize: 9.5, whiteSpace: "nowrap", color: "#fff", background: printEtatColor(value.etat),
          padding: "2px 9px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 0.3, height: "fit-content",
        }}>
          {agree(value.etat, itemAgreement(item.label).gender, itemAgreement(item.label).plural)}
        </div>
      )}
    </div>
  );
}

function PrintSection({ title, children }) {
  return (
    <div style={{ marginBottom: 16, breakInside: "avoid" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, borderBottom: `2px solid ${BRAND.blue}`, paddingBottom: 5, marginBottom: 8 }}>
        <span style={{ width: 7, height: 7, background: BRAND.amber, display: "inline-block", flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: BRAND.dark }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function PrintFieldRow({ label, value }) {
  return (
    <div style={{ display: "flex", gap: 8, fontSize: 11, padding: "3px 0" }}>
      <div style={{ width: 200, color: "#666", flexShrink: 0 }}>{label}</div>
      <div style={{ fontWeight: 600, color: BRAND.dark }}>{value || "—"}</div>
    </div>
  );
}

function computeBRKValues(eq) {
  const n = (v) => { const x = parseFloat(v); return isNaN(x) ? 0 : x; };
  const sl = eq.controles.reglage_disjoncteur.surcharge_longue.fields;
  const cc = eq.controles.reglage_disjoncteur.cc_temporise.fields;
  const inst = eq.controles.reglage_disjoncteur.instantane.fields;
  const Ir = n(sl.inominal) * n(sl.k1) * n(sl.k2);
  const Im = (cc.im_fonction_de === "In" ? n(sl.inominal) : Ir) * n(cc.k);
  const tSL = eq.controles.tests_disjoncteur.test_surcharge_longue.fields;
  const tCC = eq.controles.tests_disjoncteur.test_cc_temporise.fields;
  const testASL = n(tSL.test_a) || 1.5;
  const testACC = n(tCC.test_a) || 1.2;
  return {
    Ir, Im,
    valiseSTR_SL: Math.round(n(sl.k1) * n(sl.k2) * testASL * 100),
    valiseIS_SL: Math.round(Ir * testASL),
    valiseSTR_CC: Math.round(n(sl.k1) * n(sl.k2) * testACC * n(cc.k) * 100),
    valiseIS_CC: Math.round(Ir * n(cc.k) * testACC),
    valiseIS_Inst: Math.round(n(inst.ii) * 1000 * 1.3),
  };
}

function PrintEquipement({ eq }) {
  const schema = SCHEMAS[eq.type];
  const isRelaisSeuils = TYPES_AVEC_RELAIS.includes(eq.type);
  const brk = eq.type === "Disjoncteur BT" ? computeBRKValues(eq) : null;
  return (
    <div style={{ marginBottom: 22, breakInside: "avoid", pageBreakBefore: "always" }}>
      <div style={{ background: BRAND.dark, color: "#fff", padding: "9px 14px", borderRadius: 6, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.3 }}>{eq.type}</span>
        <span style={{ width: 26, height: 4, background: BRAND.amber, borderRadius: 2 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2px 20px", marginBottom: 12 }}>
        {schema.identification.map((f) => <PrintFieldRow key={f.key} label={f.label} value={eq.identification[f.key]} />)}
      </div>
      {schema.sections.map((sec) => (
        <PrintSection key={sec.key} title={sec.title}>
          {isRelaisSeuils && sec.key === "parametrage_relais" && (
            eq.controles.parametrage_relais_seuils.length === 0 ? (
              <div style={{ fontSize: 10.5, color: "#666" }}>Aucun seuil paramétré</div>
            ) : eq.controles.parametrage_relais_seuils.map((s) => (
              <div key={s.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "4px 0", borderBottom: "1px solid #e5e5e5", fontSize: 11 }}>
                <div style={{ flex: "1 1 260px" }}>
                  <div>{s.label || "(seuil sans nom)"}</div>
                  <div style={{ color: "#666", fontSize: 10 }}>
                    {[s.fields.etat && `État : ${s.fields.etat}`, s.fields.courbe && `Courbe : ${s.fields.courbe}`, s.fields.type && `Type : ${s.fields.type}`,
                      s.fields.reglage && `Réglage : ${s.fields.reglage} A`, s.fields.temporisation && `Temporisation : ${s.fields.temporisation} ${s.fields.temporisation_unite || ""}`]
                      .filter(Boolean).join(" · ")}
                  </div>
                </div>
              </div>
            ))
          )}
          {isRelaisSeuils && sec.key === "controles_relais" && (
            <>
              {eq.controles.parametrage_relais_seuils.filter((s) => s.label).map((s) => {
                const tol = calcToleranceEssai(s.fields.temporisation, s.fields.temporisation_unite);
                const parts = [s.essai.fields.l1 && `L1 : ${s.essai.fields.l1}`, s.essai.fields.l2 && `L2 : ${s.essai.fields.l2}`, s.essai.fields.l3 && `L3 : ${s.essai.fields.l3}`, s.essai.fields.courant_injecte && `Courant injecté : ${s.essai.fields.courant_injecte} A`].filter(Boolean);
                return (
                  <div key={s.id}>
                    <PrintControlLine item={{ label: "Essai de déclenchement — " + s.label, fields: [] }} value={{ action: s.essai.action, etat: s.essai.etat, fields: {} }} extraParts={parts} />
                    {tol && <div style={{ fontSize: 10, color: "#666", marginTop: -3, marginBottom: 4 }}>Tolérance attendue : {tol.min} – {tol.max} {tol.unite}</div>}
                  </div>
                );
              })}
              <PrintControlLine item={{ label: "Contrôle du circuit de mesures et commande", fields: [] }} value={eq.controles.controles_relais.circuit_mesures_commande} />
            </>
          )}
          {!(isRelaisSeuils && (sec.key === "parametrage_relais" || sec.key === "controles_relais")) && sec.items.map((item) => {
            const value = eq.controles[sec.key][item.key];
            return (
              <div key={item.key}>
                <PrintControlLine item={item} value={value} />
              </div>
            );
          })}
          {brk && sec.key === "reglage_disjoncteur" && (
            <div style={{ fontSize: 11, marginTop: 6 }}>
              <b>Ir (calculé) :</b> {brk.Ir || "—"} A &nbsp;·&nbsp; <b>Im (calculé) :</b> {brk.Im || "—"} A
            </div>
          )}
          {brk && sec.key === "tests_disjoncteur" && (
            <div style={{ fontSize: 11, marginTop: 6 }}>
              <div>Surcharge longue — Valise STR : {brk.valiseSTR_SL} mA · Valise IS : {brk.valiseIS_SL} A</div>
              <div>Court-circuit temporisé — Valise STR : {brk.valiseSTR_CC} mA · Valise IS : {brk.valiseIS_CC} A</div>
              <div>Instantané — Valise IS : {brk.valiseIS_Inst} A</div>
            </div>
          )}
          {(eq.controles[sec.key + "__custom"] || []).map((c) => (
            <div key={c.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "5px 0", borderBottom: "1px solid #e5e5e5", fontSize: 11 }}>
              <div style={{ flex: "1 1 260px" }}>
                <div>{c.label || "(action ajoutée)"}</div>
                {c.action ? <div style={{ color: "#666", fontSize: 10 }}>Action : {c.action}</div> : null}
              </div>
              <div style={{ fontWeight: 700, fontSize: 9.5, whiteSpace: "nowrap", color: "#fff", background: printEtatColor(c.etat), padding: "2px 9px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 0.3, height: "fit-content" }}>
                {c.etat}
              </div>
            </div>
          ))}
        </PrintSection>
      ))}
      <div style={{ marginTop: 10, paddingTop: 10, borderTop: `2px solid ${BRAND.blue}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: BRAND.dark }}>Synthèse de l'état — à l'issue de la maintenance</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: printEtatColor(eq.etatFinal), padding: "3px 11px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 0.3 }}>
          {agree(eq.etatFinal, equipGender(eq.type), false)}
        </span>
      </div>
      {eq.remarques && <div style={{ fontSize: 11, marginTop: 6 }}><b>Remarques et préconisations :</b><br />{eq.remarques}</div>}
      <PrintPhotos photos={eq.photos} />
      {eq.type === "Disjoncteur BT" && eq.courbeFiles && eq.courbeFiles.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "#555", marginBottom: 6 }}>Courbe de déclenchement — pièces jointes</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {eq.courbeFiles.map((f) =>
              f.isPdf ? (
                <div key={f.id} style={{ fontSize: 10, color: "#0A5DA8", border: "1px solid #ccc", padding: "6px 10px", borderRadius: 4 }}>{f.name || "document.pdf"} (PDF joint)</div>
              ) : (
                <div key={f.id} style={{ width: 140 }}>
                  <img src={f.dataUrl} alt="" style={{ width: 140, height: 105, objectFit: "cover", border: "1px solid #ccc" }} />
                  {f.caption && <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{f.caption}</div>}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PrintPhotos({ photos }) {
  if (!photos || photos.length === 0) return null;
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: "#555", marginBottom: 6 }}>Photos</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {photos.map((p) => (
          <div key={p.id} style={{ width: 140 }}>
            <img src={p.dataUrl} alt="" style={{ width: 140, height: 105, objectFit: "cover", border: "1px solid #ccc" }} />
            {p.caption && <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{p.caption}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function truncateText(s, n) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function PrintSynthese({ site }) {
  const items = site.equipements;
  return (
    <PrintSection title="Synthèse des équipements">
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${BRAND.blue}` }}>
            <th style={{ textAlign: "left", padding: "4px 8px 6px 0", color: BRAND.dark, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.3 }}>Équipement</th>
            <th style={{ textAlign: "left", padding: "4px 8px 6px 0", color: BRAND.dark, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.3 }}>Repère</th>
            <th style={{ textAlign: "left", padding: "4px 8px 6px 0", color: BRAND.dark, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.3 }}>Identification</th>
            <th style={{ textAlign: "left", padding: "4px 8px 6px 0", color: BRAND.dark, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.3 }}>État</th>
            <th style={{ textAlign: "left", padding: "4px 0 6px", color: BRAND.dark, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.3 }}>Remarques</th>
          </tr>
        </thead>
        <tbody>
          {items.map((eq, i) => {
            const schema = SCHEMAS[eq.type];
            const idLabel = schema.identification.filter((f) => f.key !== "repere").map((f) => eq.identification[f.key]).filter(Boolean).join(" · ");
            const repere = eq.identification.repere;
            return (
              <tr key={i} style={{ borderBottom: "1px solid #e5e5e5" }}>
                <td style={{ padding: "6px 8px 6px 0", fontWeight: 600, color: BRAND.dark, whiteSpace: "nowrap" }}>{eq.type}</td>
                <td style={{ padding: "6px 8px", fontWeight: 700, color: BRAND.blue }}>{repere || "—"}</td>
                <td style={{ padding: "6px 8px", color: "#666" }}>{idLabel || "—"}</td>
                <td style={{ padding: "6px 8px" }}>
                  <span style={{
                    fontWeight: 700, fontSize: 9.5, whiteSpace: "nowrap", color: "#fff", background: printEtatColor(eq.etatFinal),
                    padding: "2px 9px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 0.3,
                  }}>
                    {agree(eq.etatFinal, equipGender(eq.type), false)}
                  </span>
                </td>
                <td style={{ padding: "6px 0", color: "#666" }}>{truncateText(eq.remarques, 90) || "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </PrintSection>
  );
}

function PrintReport({ site }) {
  const rank = overallRank(site);
  const rankLabel = rankToLabel(rank);
  return (
    <div style={{ background: "#fff", color: "#111", fontFamily: "Arial, Helvetica, sans-serif", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ height: 6, background: `linear-gradient(90deg, ${BRAND.blue}, ${BRAND.amber})` }} />
      <div style={{ padding: "18px 24px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: BRAND.dark, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={LOGO_DARK} alt="HT Maintenance" style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 8 }} />
          <div>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.2, color: BRAND.silver }}>Rapport de maintenance préventive HT</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{site.nom || "Site"}</div>
            <div style={{ fontSize: 13, color: BRAND.silver }}>{site.client}</div>
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: 11 }}>
          <span style={{
            display: "inline-block", fontSize: 10.5, fontWeight: 700, color: "#fff", background: printEtatColor(rankLabel),
            padding: "3px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 0.3, marginBottom: 6,
          }}>
            État général : {rankLabel}
          </span>
          <div style={{ color: BRAND.silver }}>Date : {site.rapport.date}</div>
          <div style={{ color: BRAND.silver }}>Intervenant : {site.rapport.intervenant || "—"}</div>
        </div>
      </div>

      <div style={{ padding: "20px 24px 24px" }}>
      <PrintSection title="Rapport">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 24px", marginBottom: 10 }}>
          <PrintFieldRow label="Heure d'arrivée" value={site.rapport.heureArrivee} />
          <PrintFieldRow label="Heure de fin" value={site.rapport.heureFin} />
          <PrintFieldRow label="Marque" value={site.rapport.marque} />
          <PrintFieldRow label="Année de mise en service" value={site.rapport.anneeMiseEnService} />
          <PrintFieldRow label="Courant assigné (Ir)" value={site.rapport.courantAssigne} />
          <PrintFieldRow label="Tension assignée (Ur)" value={site.rapport.tensionAssignee} />
          <PrintFieldRow label="Nombre d'équipements" value={site.rapport.nombreEquipements} />
          <PrintFieldRow label="Prochaine maintenance recommandée avant" value={site.rapport.prochaineMaintenance} />
        </div>
        <PrintFieldRow label="Environnement" value={site.rapport.environnementEtat} />
        {site.rapport.environnementRemarque && <div style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>{site.rapport.environnementRemarque}</div>}
        <PrintFieldRow label="Fonctionnement de l'installation" value={site.rapport.fonctionnementEtat} />
        {site.rapport.fonctionnementRemarque && <div style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>{site.rapport.fonctionnementRemarque}</div>}
        {site.rapport.syntheseRemarques && (
          <div style={{ marginTop: 8, fontSize: 11 }}><b>Synthèse des remarques et préconisations :</b><br />{site.rapport.syntheseRemarques}</div>
        )}
        <PrintPhotos photos={site.rapport.photos} />
      </PrintSection>

      <PrintSynthese site={site} />

      {site.equipements.map((eq) => <PrintEquipement key={eq.id} eq={eq} />)}

      <div style={{ marginTop: 24, paddingTop: 10, borderTop: `1px solid ${BRAND.silver}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 9, color: "#888" }}>
        <span>HT Maintenance — Maintenance électrique HTA / BT</span>
        <span>Rapport généré le {todayISO()}</span>
      </div>
      </div>
    </div>
  );
}

/* =========================================================================
   Rapport d'intervention — export Word (document client)
   ========================================================================= */
function PrintIntervention({ iv }) {
  const natureLabels = NATURE_INTERVENTION.filter((n) => iv.nature[n.key]).map((n) => n.label);
  const duree = dureeIntervention(iv.heureDebut, iv.heureFin);
  return (
    <div style={{ background: "#fff", color: "#111", fontFamily: "Arial, Helvetica, sans-serif", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ height: 6, background: `linear-gradient(90deg, ${BRAND.blue}, ${BRAND.amber})` }} />
      <div style={{ padding: "18px 24px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: BRAND.dark, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={LOGO_DARK} alt="HT Maintenance" style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 8 }} />
          <div>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.2, color: BRAND.silver }}>Rapport d'intervention</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{iv.numeroRI}</div>
            <div style={{ fontSize: 13, color: BRAND.silver }}>{iv.client}{iv.site ? " — " + iv.site : ""}</div>
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: 11 }}>
          <span style={{
            display: "inline-block", fontSize: 10.5, fontWeight: 700, color: "#fff", background: printEtatColor(iv.conclusion),
            padding: "3px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 0.3, marginBottom: 6,
          }}>
            {iv.conclusion}
          </span>
          <div style={{ color: BRAND.silver }}>Date : {iv.date}</div>
          <div style={{ color: BRAND.silver }}>Technicien : {iv.technicien || "—"}</div>
        </div>
      </div>

      <div style={{ padding: "20px 24px 24px" }}>
        <PrintSection title="Informations générales">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 24px" }}>
            <PrintFieldRow label="Client" value={iv.client} />
            <PrintFieldRow label="Site" value={iv.site} />
            <PrintFieldRow label="Heure début" value={iv.heureDebut} />
            <PrintFieldRow label="Heure fin" value={iv.heureFin} />
            <PrintFieldRow label="Durée" value={duree} />
            <PrintFieldRow label="Nature de l'intervention" value={natureLabels.join(", ")} />
          </div>
        </PrintSection>

        <PrintSection title="Équipement">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 24px" }}>
            <PrintFieldRow label="Type" value={iv.equipement.type} />
            <PrintFieldRow label="Constructeur" value={iv.equipement.constructeur} />
            <PrintFieldRow label="Modèle" value={iv.equipement.modele} />
            <PrintFieldRow label="N° de série" value={iv.equipement.numeroSerie} />
            <PrintFieldRow label="Localisation" value={iv.equipement.localisation} />
            <PrintFieldRow label="Référence" value={iv.equipement.reference} />
          </div>
        </PrintSection>

        <PrintSection title="Travaux réalisés">
          {iv.travauxActions && iv.travauxActions.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              {iv.travauxActions.map((a, i) => (
                <div key={a.id || i} style={{ display: "flex", gap: 10, fontSize: 11, padding: "3px 0", borderBottom: "1px solid #e5e5e5" }}>
                  <div style={{ width: 200, fontWeight: 600, color: BRAND.dark, flexShrink: 0 }}>{a.action || "—"}</div>
                  <div style={{ color: "#666" }}>{a.detail || ""}</div>
                </div>
              ))}
            </div>
          )}
          {iv.travauxRealises && <div style={{ fontSize: 11, whiteSpace: "pre-wrap", marginTop: iv.travauxActions && iv.travauxActions.length > 0 ? 8 : 0 }}>{iv.travauxRealises}</div>}
          {(!iv.travauxActions || iv.travauxActions.length === 0) && !iv.travauxRealises && <div style={{ fontSize: 11, color: "#666" }}>—</div>}
        </PrintSection>

        <PrintSection title="Mesures / Contrôles">
          <PrintFieldRow label="Isolement" value={iv.mesures.isolement} />
          <PrintFieldRow label="Résistance de contact" value={iv.mesures.resistanceContact} />
          <PrintFieldRow label="Temps de manœuvre" value={iv.mesures.tempsManoeuvre} />
          <PrintFieldRow label="Essais fonctionnels" value={iv.mesures.essaisFonctionnels} />
          <PrintFieldRow label="Observations" value={iv.mesures.observations} />
        </PrintSection>

        <PrintSection title="Anomalies et recommandations">
          <div style={{ fontSize: 11, whiteSpace: "pre-wrap" }}>{iv.anomaliesRecommandations || "—"}</div>
        </PrintSection>

        <div style={{ marginTop: 6, marginBottom: 18, display: "flex", justifyContent: "flex-end" }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: "#fff", background: printEtatColor(iv.conclusion),
            padding: "4px 14px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 0.3,
          }}>
            Conclusion : {iv.conclusion}
          </span>
        </div>

        <PrintSection title="Validation">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>Nom client : <b style={{ color: BRAND.dark }}>{iv.validation.nomClient || "—"}</b></div>
              {iv.validation.signatureClient ? (
                <img src={iv.validation.signatureClient} alt="Signature client" style={{ width: 220, height: 80, objectFit: "contain", border: "1px solid #ccc" }} />
              ) : (
                <div style={{ width: 220, height: 80, border: "1px solid #ccc" }} />
              )}
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>Technicien HT Maintenance : <b style={{ color: BRAND.dark }}>{iv.validation.technicienHT || iv.technicien || "—"}</b></div>
              {iv.validation.signatureHT ? (
                <img src={iv.validation.signatureHT} alt="Signature technicien" style={{ width: 220, height: 80, objectFit: "contain", border: "1px solid #ccc" }} />
              ) : (
                <div style={{ width: 220, height: 80, border: "1px solid #ccc" }} />
              )}
            </div>
          </div>
        </PrintSection>

        <div style={{ marginTop: 24, paddingTop: 10, borderTop: `1px solid ${BRAND.silver}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 9, color: "#888" }}>
          <span>HT Maintenance — Maintenance électrique HTA / BT</span>
          <span>Rapport généré le {todayISO()}</span>
        </div>
      </div>
    </div>
  );
}

function SiteDetail({ site, update, onBack, onDelete, onPrint, onCreateIntervention }) {
  const presentTypes = useMemo(() => EQUIPMENT_TYPES.filter((t) => site.equipements.some((e) => e.type === t)), [site.equipements]);
  const [activeTab, setActiveTab] = useState("rapport");
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  useEffect(() => {
    if (activeTab !== "rapport" && !presentTypes.includes(activeTab)) setActiveTab("rapport");
  }, [presentTypes, activeTab]);

  const remainingTypes = EQUIPMENT_TYPES.filter((t) => !presentTypes.includes(t));

  function addEquipmentType(type) {
    update((d) => ({ ...d, equipements: [...d.equipements, emptyEquipement(type)] }));
    setActiveTab(type);
    setAddMenuOpen(false);
  }

  const rank = overallRank(site);
  const tabs = [
    { key: "rapport", label: "Rapport", icon: FileText },
    ...presentTypes.map((t) => ({ key: t, label: t, icon: t === "Sécurité" ? ShieldCheck : Settings2 })),
  ];

  return (
    <div>
      <button onClick={onBack} style={{ ...btnGhost(), marginBottom: 16 }}><ArrowLeft size={14} /> Retour au tableau de bord</button>

      <Card style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, flex: "1 1 380px" }}>
            <Field label="Dénomination client"><TextInput value={site.client} onChange={(e) => update((d) => ({ ...d, client: e.target.value }))} placeholder="Client" /></Field>
            <Field label="Nom du site"><TextInput value={site.nom} onChange={(e) => update((d) => ({ ...d, nom: e.target.value }))} placeholder="Nom du site" /></Field>
            <Field label="Local"><TextInput value={site.local} onChange={(e) => update((d) => ({ ...d, local: e.target.value }))} placeholder="Local / emplacement" /></Field>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <StatusBadge label={rankToLabel(rank)} />
            <button onClick={() => onPrint(site)} style={btnGhost("#FFC107")}>
              <FileText size={13} /> Rapport Word
            </button>
            <button onClick={() => onCreateIntervention(site, null)} style={btnGhost(BRAND.blue)}>
              <ClipboardList size={13} /> Rapport d'intervention
            </button>
            <InlineConfirmButton icon={Trash2} label="Supprimer le site" onConfirm={() => onDelete(site.id)} />
          </div>
        </div>
      </Card>

      <div style={{ marginBottom: 18 }}>
        <div className="tab-bar-scroll" style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", borderBottom: "1px solid #D8DEE5", paddingBottom: 12 }}>
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.key;
            return (
              <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 999, flexShrink: 0,
                border: active ? "1px solid #FFC10755" : "1px solid #D8DEE5", background: active ? "rgba(245,166,35,0.12)" : "transparent",
                color: active ? "#FFC107" : "#5B6B7D", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
              }}>
                <Icon size={13} /> {t.label}
                {t.key !== "rapport" && (
                  <span style={{ fontSize: 10.5, color: active ? "#FFC107" : "#8B96A3" }}>
                    ({site.equipements.filter((e) => e.type === t.key).length})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
          <div style={{ position: "relative" }}>
            <button onClick={() => setAddMenuOpen((o) => !o)} disabled={remainingTypes.length === 0}
              style={{ ...btnGhost("#FFC107"), opacity: remainingTypes.length === 0 ? 0.4 : 1, cursor: remainingTypes.length === 0 ? "not-allowed" : "pointer" }}>
              <Plus size={13} /> Type d'équipement
            </button>
            {addMenuOpen && remainingTypes.length > 0 && (
              <div style={{ position: "absolute", right: 0, top: "110%", background: "#F7F8FA", border: "1px solid #D8DEE5", borderRadius: 10, overflow: "hidden", zIndex: 50, minWidth: 200, boxShadow: "0 12px 30px rgba(0,0,0,0.4)" }}>
                {remainingTypes.map((t) => (
                  <div key={t} onClick={() => addEquipmentType(t)} style={{ padding: "9px 14px", fontSize: 12.5, color: "#3E4A5C", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#E2E6EB")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {activeTab === "rapport" && <RapportTab site={site} update={update} />}
      {presentTypes.includes(activeTab) && <EquipementTypeTab type={activeTab} site={site} update={update} />}
    </div>
  );
}

/* =========================================================================
   Rapport d'intervention — édition
   ========================================================================= */
function IvField({ label, children, span }) {
  return (
    <div style={{ gridColumn: span ? `span ${span}` : undefined }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#5B6B7D", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

function InterventionEditor({ iv, update, onBack, onDelete, onPrint }) {
  const set = (k, v) => update((d) => ({ ...d, [k]: v }));
  const setEquip = (k, v) => update((d) => ({ ...d, equipement: { ...d.equipement, [k]: v } }));
  const setNature = (k, v) => update((d) => ({ ...d, nature: { ...d.nature, [k]: v } }));
  const setMesure = (k, v) => update((d) => ({ ...d, mesures: { ...d.mesures, [k]: v } }));
  const setValidation = (k, v) => update((d) => ({ ...d, validation: { ...d.validation, [k]: v } }));
  const addAction = () => update((d) => ({ ...d, travauxActions: [...(d.travauxActions || []), { id: uid(), action: "", detail: "" }] }));
  const setActionField = (id, k, v) => update((d) => ({ ...d, travauxActions: d.travauxActions.map((a) => (a.id === id ? { ...a, [k]: v } : a)) }));
  const removeAction = (id) => update((d) => ({ ...d, travauxActions: d.travauxActions.filter((a) => a.id !== id) }));
  const duree = dureeIntervention(iv.heureDebut, iv.heureFin);

  function envoyerParMail() {
    const subject = encodeURIComponent(`Rapport d'intervention ${iv.numeroRI} — ${iv.client || ""}`);
    const body = encodeURIComponent(
      `Bonjour,\n\nVeuillez trouver ci-joint le rapport d'intervention ${iv.numeroRI} du ${iv.date} concernant le site ${iv.site || ""}.\n\n(Pensez à joindre le document Word généré via le bouton « Rapport Word » avant l'envoi.)\n\nCordialement,\n${iv.technicien || "HT Maintenance"}`
    );
    const to = iv.emailClient || "";
    window.open(`mailto:${to}?subject=${subject}&body=${body}`, "_blank");
  }

  return (
    <div>
      <button onClick={onBack} style={{ ...btnGhost(), marginBottom: 16 }}><ArrowLeft size={14} /> Retour aux rapports d'intervention</button>

      <Card style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 11, color: "#5B6B7D", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{iv.numeroRI}</div>
            <h2 style={{ margin: "2px 0 0", fontSize: 18, fontWeight: 700, color: "#1A1F26" }}>{iv.client || "Client à renseigner"}</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <StatusBadge label={iv.conclusion} />
            <button onClick={() => onPrint(iv)} style={btnGhost("#FFC107")}><FileText size={13} /> Rapport Word</button>
            <button onClick={envoyerParMail} style={btnGhost("#FFC107")}><Mail size={13} /> Préparer l'email</button>
            <InlineConfirmButton icon={Trash2} label="Supprimer" onConfirm={() => onDelete(iv.id)} />
          </div>
        </div>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <SectionTitle>Informations générales</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
          <IvField label="Client"><TextInput value={iv.client} onChange={(e) => set("client", e.target.value)} /></IvField>
          <IvField label="Site"><TextInput value={iv.site} onChange={(e) => set("site", e.target.value)} /></IvField>
          <IvField label="Email client"><TextInput type="email" value={iv.emailClient} onChange={(e) => set("emailClient", e.target.value)} placeholder="pour l'envoi par mail" /></IvField>
          <IvField label="Date"><TextInput type="date" value={iv.date} onChange={(e) => set("date", e.target.value)} /></IvField>
          <IvField label="Technicien">
            <Combo value={iv.technicien} onChange={(v) => set("technicien", v)} options={LISTE_INTERVENANTS} listId={`${iv.id}-tech`} />
          </IvField>
          <IvField label="Heure début"><TextInput type="time" value={iv.heureDebut} onChange={(e) => set("heureDebut", e.target.value)} /></IvField>
          <IvField label="Heure fin"><TextInput type="time" value={iv.heureFin} onChange={(e) => set("heureFin", e.target.value)} /></IvField>
          <IvField label="Durée"><TextInput value={duree} disabled style={{ opacity: 0.7 }} /></IvField>
        </div>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <SectionTitle>Équipement</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
          <IvField label="Type">
            <Combo value={iv.equipement.type} onChange={(v) => setEquip("type", v)} options={[...EQUIPMENT_TYPES, "Sécurité"]} listId={`${iv.id}-type`} />
          </IvField>
          <IvField label="Constructeur">
            <Combo value={iv.equipement.constructeur} onChange={(v) => setEquip("constructeur", v)} options={LISTE_MARQUES} listId={`${iv.id}-construct`} />
          </IvField>
          <IvField label="Modèle"><TextInput value={iv.equipement.modele} onChange={(e) => setEquip("modele", e.target.value)} /></IvField>
          <IvField label="N° de série"><TextInput value={iv.equipement.numeroSerie} onChange={(e) => setEquip("numeroSerie", e.target.value)} /></IvField>
          <IvField label="Localisation"><TextInput value={iv.equipement.localisation} onChange={(e) => setEquip("localisation", e.target.value)} /></IvField>
          <IvField label="Référence"><TextInput value={iv.equipement.reference} onChange={(e) => setEquip("reference", e.target.value)} /></IvField>
        </div>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <SectionTitle>Nature de l'intervention</SectionTitle>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {NATURE_INTERVENTION.map((n) => (
            <label key={n.key} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#3E4A5C", cursor: "pointer" }}>
              <input type="checkbox" checked={iv.nature[n.key]} onChange={(e) => setNature(n.key, e.target.checked)} style={{ width: 15, height: 15, accentColor: BRAND.blue }} />
              {n.label}
            </label>
          ))}
        </div>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <SectionTitle>Travaux réalisés</SectionTitle>
          <button onClick={addAction} style={btnGhost(BRAND.amber)}><Plus size={13} /> Ajouter une action</button>
        </div>

        {(!iv.travauxActions || iv.travauxActions.length === 0) ? (
          <div style={{ textAlign: "center", padding: 18, color: "#8B96A3", fontSize: 12.5, border: "1px dashed #D8DEE5", borderRadius: 10, marginBottom: 14 }}>
            Aucune action ajoutée au tableau.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
            {iv.travauxActions.map((a) => (
              <div key={a.id} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 220px" }}>
                  <Combo
                    value={a.action}
                    onChange={(v) => setActionField(a.id, "action", v)}
                    options={ACTIONS_INTERVENTION}
                    listId={`${iv.id}-action-${a.id}`}
                    placeholder="Action réalisée"
                  />
                </div>
                <div style={{ flex: "2 1 300px" }}>
                  <TextInput
                    value={a.detail}
                    onChange={(e) => setActionField(a.id, "detail", e.target.value)}
                    placeholder="Détail / commentaire (facultatif)"
                  />
                </div>
                <button onClick={() => removeAction(a.id)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: 4 }} title="Retirer">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}

        <IvField label="Description complémentaire (facultatif)">
          <TextArea value={iv.travauxRealises} onChange={(e) => set("travauxRealises", e.target.value)} placeholder="Précisions libres sur l'intervention" style={{ minHeight: 100 }} />
        </IvField>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <SectionTitle>Mesures / Contrôles</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          <IvField label="Isolement"><TextInput value={iv.mesures.isolement} onChange={(e) => setMesure("isolement", e.target.value)} /></IvField>
          <IvField label="Résistance de contact"><TextInput value={iv.mesures.resistanceContact} onChange={(e) => setMesure("resistanceContact", e.target.value)} /></IvField>
          <IvField label="Temps de manœuvre"><TextInput value={iv.mesures.tempsManoeuvre} onChange={(e) => setMesure("tempsManoeuvre", e.target.value)} /></IvField>
          <IvField label="Essais fonctionnels"><TextInput value={iv.mesures.essaisFonctionnels} onChange={(e) => setMesure("essaisFonctionnels", e.target.value)} /></IvField>
          <IvField label="Observations" span={2}><TextArea value={iv.mesures.observations} onChange={(e) => setMesure("observations", e.target.value)} /></IvField>
        </div>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <SectionTitle>Anomalies et recommandations</SectionTitle>
        <TextArea value={iv.anomaliesRecommandations} onChange={(e) => set("anomaliesRecommandations", e.target.value)} style={{ minHeight: 100 }} />
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <SectionTitle>Conclusion</SectionTitle>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {CONCLUSION_INTERVENTION.map((c) => (
            <label key={c} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#3E4A5C", cursor: "pointer" }}>
              <input type="radio" name={`conclusion-${iv.id}`} checked={iv.conclusion === c} onChange={() => set("conclusion", c)} style={{ width: 15, height: 15, accentColor: BRAND.blue }} />
              {c}
            </label>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle>Validation</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          <div>
            <IvField label="Nom client"><TextInput value={iv.validation.nomClient} onChange={(e) => setValidation("nomClient", e.target.value)} /></IvField>
            <div style={{ marginTop: 10 }}>
              <SignatureField label="Signature client" value={iv.validation.signatureClient} onChange={(v) => setValidation("signatureClient", v)} />
            </div>
          </div>
          <div>
            <IvField label="Technicien HT Maintenance">
              <TextInput value={iv.validation.technicienHT || iv.technicien} onChange={(e) => setValidation("technicienHT", e.target.value)} />
            </IvField>
            <div style={{ marginTop: 10 }}>
              <SignatureField label="Signature HT Maintenance" value={iv.validation.signatureHT} onChange={(v) => setValidation("signatureHT", v)} />
            </div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#8B96A3", marginTop: 12 }}>
          Signature indisponible ? Générez le document Word et faites-le signer à la main après impression.
        </div>
      </Card>
    </div>
  );
}

function InterventionPrefillPicker({ sites, onCancel, onConfirm }) {
  const [siteId, setSiteId] = useState("");
  const site = sites.find((s) => s.id === siteId) || null;
  const [equipId, setEquipId] = useState("");
  const equipOptions = site ? site.equipements.map((e) => ({ id: e.id, label: `${e.type}${e.identification.repere ? " — " + e.identification.repere : ""}`, eq: e })) : [];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(4,9,16,0.72)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px", overflowY: "auto", zIndex: 50 }} onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div style={{ background: "#FFFFFF", border: "1px solid #D8DEE5", borderRadius: 16, width: "100%", maxWidth: 480 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #D8DEE5" }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1A1F26" }}>Pré-remplir depuis un site</h2>
          <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", color: "#5B6B7D" }}><X size={18} /></button>
        </div>
        <div style={{ padding: 24 }}>
          <IvField label="Site">
            <Select value={siteId} onChange={(e) => { setSiteId(e.target.value); setEquipId(""); }}>
              <option value="">— Choisir un site —</option>
              {sites.map((s) => <option key={s.id} value={s.id}>{s.nom || "Site sans nom"} — {s.client}</option>)}
            </Select>
          </IvField>
          {site && (
            <div style={{ marginTop: 14 }}>
              <IvField label="Équipement (optionnel)">
                <Select value={equipId} onChange={(e) => setEquipId(e.target.value)}>
                  <option value="">— Aucun (informations générales uniquement) —</option>
                  {equipOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                </Select>
              </IvField>
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 24px", borderTop: "1px solid #D8DEE5" }}>
          <button onClick={onCancel} style={btnGhost()}>Annuler</button>
          <button
            disabled={!site}
            onClick={() => onConfirm(site, equipId ? equipOptions.find((o) => o.id === equipId).eq : null)}
            style={{ ...btnPrimary(), opacity: site ? 1 : 0.5, cursor: site ? "pointer" : "not-allowed" }}
          >
            Créer le rapport
          </button>
        </div>
      </div>
    </div>
  );
}

function InterventionsOverview({ interventions, sites, onOpen, onCreate }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return interventions;
    const q = query.toLowerCase();
    return interventions.filter((iv) => (iv.numeroRI + " " + iv.client + " " + iv.site + " " + iv.technicien).toLowerCase().includes(q));
  }, [interventions, query]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date)), [filtered]);

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: "1 1 220px", position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: 11, top: 10, color: "#8B96A3" }} />
          <TextInput placeholder="Rechercher N° RI, client, site, technicien…" value={query} onChange={(e) => setQuery(e.target.value)} style={{ paddingLeft: 32 }} />
        </div>
        <button onClick={() => onCreate(null, null)} style={btnGhost("#FFC107")}><Plus size={14} /> Rapport vierge</button>
        <button onClick={() => setPickerOpen(true)} style={btnPrimary()}><Plus size={15} /> Pré-remplir depuis un site</button>
      </div>

      {sorted.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#FFFFFF", border: "1px dashed #D8DEE5", borderRadius: 14 }}>
          <ClipboardList size={28} color="#9AA5B1" style={{ marginBottom: 10 }} />
          <div style={{ fontSize: 14, fontWeight: 600, color: "#3E4A5C", marginBottom: 4 }}>
            {interventions.length === 0 ? "Aucun rapport d'intervention" : "Aucun résultat pour cette recherche"}
          </div>
          <div style={{ fontSize: 12.5, color: "#8B96A3" }}>Créez votre premier rapport à transmettre au client.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sorted.map((iv) => (
            <div key={iv.id} onClick={() => onOpen(iv.id)} className="iv-row"
              style={{ background: "#FFFFFF", border: "1px solid #D8DEE5", borderRadius: 12, padding: "13px 16px", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#9AA5B1")} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#D8DEE5")}
            >
              <div className="iv-row-meta hide-mobile" style={{ flex: "0 0 100px", fontSize: 11.5, color: "#5B6B7D", fontWeight: 700 }}>{iv.numeroRI}</div>
              <div className="iv-row-main" style={{ flex: "1 1 220px", minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1A1F26", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{iv.client || "Client non renseigné"}</div>
                <div style={{ fontSize: 12, color: "#5B6B7D" }}>{iv.numeroRI} · {iv.site || "—"}</div>
              </div>
              <div className="iv-row-meta" style={{ flex: "0 0 100px", fontSize: 12, color: "#3E4A5C" }}>{iv.date}</div>
              <div className="iv-row-meta" style={{ flex: "0 0 120px" }}><StatusBadge label={iv.conclusion} /></div>
              <ChevronRight size={16} color="#9AA5B1" className="hide-mobile" />
            </div>
          ))}
        </div>
      )}

      {pickerOpen && (
        <InterventionPrefillPicker
          sites={sites}
          onCancel={() => setPickerOpen(false)}
          onConfirm={(site, eq) => { onCreate(site, eq); setPickerOpen(false); }}
        />
      )}
    </div>
  );
}

/* =========================================================================
   Calendrier
   ========================================================================= */
const WEEKDAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

function isoOf(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function parseIso(s) { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); }
function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function startOfWeekMon(d) { const r = new Date(d); const day = (r.getDay() + 6) % 7; r.setDate(r.getDate() - day); r.setHours(0, 0, 0, 0); return r; }

function buildCalendarEvents(sites, interventions) {
  const events = [];
  sites.forEach((s) => {
    if (s.rapport && s.rapport.date) {
      events.push({ id: "site-" + s.id, dateISO: s.rapport.date, kind: "site", label: s.nom || "Site sans nom", sub: s.client, statusLabel: rankToLabel(overallRank(s)), refId: s.id });
    }
  });
  interventions.forEach((iv) => {
    if (iv.date) {
      events.push({ id: "iv-" + iv.id, dateISO: iv.date, kind: "intervention", label: iv.client || "Client non renseigné", sub: iv.numeroRI, statusLabel: iv.conclusion, refId: iv.id });
    }
  });
  return events;
}

function EventChip({ ev, onClick }) {
  const rank = RANK_OF[ev.statusLabel] ?? 0;
  const color = RANK_COLOR[rank].color;
  return (
    <div onClick={(e) => { e.stopPropagation(); onClick(); }} style={{
      display: "flex", alignItems: "center", gap: 5, padding: "2px 6px", borderRadius: 5, background: `${color}1F`,
      fontSize: 10.5, color: "#1A1F26", cursor: "pointer", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{ev.label}</span>
    </div>
  );
}

function DayDetailPanel({ dateISO, events, onOpenSite, onOpenIntervention, onCreateForDate, onCreateInterventionForDate }) {
  const d = parseIso(dateISO);
  const label = `${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
  return (
    <Card style={{ marginTop: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <SectionTitle>{label}</SectionTitle>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => onCreateForDate(dateISO)} style={btnGhost(BRAND.amber)}><Plus size={13} /> Préparer un rapport ce jour</button>
          <button onClick={() => onCreateInterventionForDate(dateISO)} style={btnGhost(BRAND.blue)}><ClipboardList size={13} /> Créer un rapport d'intervention</button>
        </div>
      </div>
      {events.length === 0 ? (
        <div style={{ textAlign: "center", padding: 18, color: "#8B96A3", fontSize: 12.5, border: "1px dashed #D8DEE5", borderRadius: 10 }}>
          Aucune intervention prévue ce jour
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {events.map((ev) => (
            <div key={ev.id} onClick={() => (ev.kind === "site" ? onOpenSite(ev.refId) : onOpenIntervention(ev.refId))}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#F7F8FA", border: "1px solid #D8DEE5", borderRadius: 10, cursor: "pointer" }}>
              {ev.kind === "site" ? <Building2 size={14} color="#5B6B7D" /> : <ClipboardList size={14} color="#5B6B7D" />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1F26", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.label}</div>
                <div style={{ fontSize: 11, color: "#5B6B7D" }}>{ev.kind === "site" ? "Site" : "Rapport d'intervention"} {ev.sub ? "· " + ev.sub : ""}</div>
              </div>
              <StatusBadge label={ev.statusLabel} size="sm" />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function CalendarView({ sites, interventions, onOpenSite, onOpenIntervention, onCreateForDate, onCreateInterventionForDate }) {
  const [mode, setMode] = useState("month");
  const [ref, setRef] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const todayIso = todayISO();
  const events = useMemo(() => buildCalendarEvents(sites, interventions), [sites, interventions]);
  const byDate = useMemo(() => {
    const m = {};
    events.forEach((e) => { (m[e.dateISO] = m[e.dateISO] || []).push(e); });
    return m;
  }, [events]);

  useEffect(() => {
    if (mode === "day") setSelectedDay(isoOf(ref));
  }, [mode, ref]);

  function shift(delta) {
    setRef((prev) => {
      const d = new Date(prev);
      if (mode === "month") d.setMonth(d.getMonth() + delta);
      else if (mode === "week") d.setDate(d.getDate() + delta * 7);
      else d.setDate(d.getDate() + delta);
      return d;
    });
  }

  let headerLabel;
  if (mode === "month") headerLabel = `${MONTHS_FR[ref.getMonth()]} ${ref.getFullYear()}`;
  else if (mode === "week") {
    const start = startOfWeekMon(ref), end = addDays(start, 6);
    headerLabel = `${start.getDate()} ${MONTHS_FR[start.getMonth()]} – ${end.getDate()} ${MONTHS_FR[end.getMonth()]} ${end.getFullYear()}`;
  } else headerLabel = `${WEEKDAYS_FR[(ref.getDay() + 6) % 7]} ${ref.getDate()} ${MONTHS_FR[ref.getMonth()]} ${ref.getFullYear()}`;

  const modeBtn = (key, label) => (
    <button onClick={() => setMode(key)} style={{
      padding: "6px 13px", borderRadius: 999, border: mode === key ? "1px solid #FFC10755" : "1px solid #D8DEE5",
      background: mode === key ? "rgba(255,193,7,0.12)" : "transparent", color: mode === key ? BRAND.amber : "#5B6B7D",
      fontSize: 12, fontWeight: 600, cursor: "pointer",
    }}>{label}</button>
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => shift(-1)} style={btnGhost()}><ArrowLeft size={14} /></button>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1F26", minWidth: 180 }}>{headerLabel}</div>
          <button onClick={() => shift(1)} style={{ ...btnGhost(), transform: "scaleX(-1)" }}><ArrowLeft size={14} /></button>
          <button onClick={() => { setRef(new Date()); setSelectedDay(todayIso); }} style={btnGhost()}>Aujourd'hui</button>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {modeBtn("day", "Jour")}
          {modeBtn("week", "Semaine")}
          {modeBtn("month", "Mois")}
        </div>
      </div>

      {mode === "month" && (() => {
        const firstOfMonth = new Date(ref.getFullYear(), ref.getMonth(), 1);
        const gridStart = startOfWeekMon(firstOfMonth);
        const cells = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
        return (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 6 }}>
              {WEEKDAYS_FR.map((w) => <div key={w} style={{ textAlign: "center", fontSize: 10.5, fontWeight: 700, color: "#8B96A3", textTransform: "uppercase" }}>{w}</div>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
              {cells.map((d) => {
                const iso = isoOf(d);
                const inMonth = d.getMonth() === ref.getMonth();
                const dayEvents = byDate[iso] || [];
                const isToday = iso === todayIso;
                const isSelected = iso === selectedDay;
                return (
                  <div key={iso} onClick={() => setSelectedDay(iso)} style={{
                    minHeight: 74, borderRadius: 8, padding: 6, cursor: "pointer",
                    background: isSelected ? "rgba(255,193,7,0.10)" : "#F7F8FA",
                    border: isSelected ? "1px solid #FFC10788" : isToday ? "1px solid #0A5DA8" : "1px solid #D8DEE5",
                    opacity: inMonth ? 1 : 0.4,
                  }}>
                    <div style={{ fontSize: 11, fontWeight: isToday ? 800 : 600, color: isToday ? "#FFC107" : "#3E4A5C", marginBottom: 4 }}>{d.getDate()}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {dayEvents.slice(0, 2).map((ev) => <EventChip key={ev.id} ev={ev} onClick={() => (ev.kind === "site" ? onOpenSite(ev.refId) : onOpenIntervention(ev.refId))} />)}
                      {dayEvents.length > 2 && <div style={{ fontSize: 10, color: "#8B96A3" }}>+{dayEvents.length - 2}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {mode === "week" && (() => {
        const start = startOfWeekMon(ref);
        const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
        return (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
            {days.map((d) => {
              const iso = isoOf(d);
              const dayEvents = byDate[iso] || [];
              const isToday = iso === todayIso;
              return (
                <div key={iso} onClick={() => setSelectedDay(iso)} style={{
                  minHeight: 140, borderRadius: 10, padding: 10, cursor: "pointer", background: "#F7F8FA",
                  border: iso === selectedDay ? "1px solid #FFC10788" : isToday ? "1px solid #0A5DA8" : "1px solid #D8DEE5",
                }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: "#8B96A3", textTransform: "uppercase" }}>{WEEKDAYS_FR[(d.getDay() + 6) % 7]}</div>
                  <div style={{ fontSize: 15, fontWeight: isToday ? 800 : 600, color: isToday ? "#FFC107" : "#1A1F26", marginBottom: 8 }}>{d.getDate()}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {dayEvents.map((ev) => <EventChip key={ev.id} ev={ev} onClick={() => (ev.kind === "site" ? onOpenSite(ev.refId) : onOpenIntervention(ev.refId))} />)}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}

      {(selectedDay || mode === "day") && (
        <DayDetailPanel
          dateISO={mode === "day" ? isoOf(ref) : (selectedDay || todayIso)}
          events={byDate[mode === "day" ? isoOf(ref) : (selectedDay || todayIso)] || []}
          onOpenSite={onOpenSite}
          onOpenIntervention={onOpenIntervention}
          onCreateForDate={onCreateForDate}
          onCreateInterventionForDate={onCreateInterventionForDate}
        />
      )}
    </div>
  );
}

/* =========================================================================
   App
   ========================================================================= */
/* =========================================================================
   Export Word (.docx réel) — via la bibliothèque "docx", compatible
   Microsoft Word ET Pages sur Mac (contrairement à l'ancienne astuce HTML
   qui n'était comprise que par Word).
   ========================================================================= */
// La bibliothèque "docx" est chargée dynamiquement (pas en import statique) : l'aperçu
// d'artefact de Claude n'autorise qu'une liste fixe de bibliothèques et planterait au
// chargement si "docx" était importée en haut du fichier. Une fois l'app réellement
// déployée (Vercel, etc.), ce chargement dynamique résout normalement le vrai paquet npm.
let DOCX = null;
async function ensureDocx() {
  if (!DOCX) DOCX = await import("docx");
  return DOCX;
}

const DOCX_BLUE = "0A5DA8", DOCX_DARK = "1A1F26", DOCX_SILVER = "C0C6CE", DOCX_AMBER = "FFC107";
const DOCX_GREEN = "0F8A5F", DOCX_ORANGE = "B5730A", DOCX_RED = "C0392B", DOCX_WHITE = "FFFFFF", DOCX_LIGHT = "F4F6F8";

function docxEtatColor(label) {
  const rank = RANK_OF[label] ?? 0;
  if (rank === 2) return DOCX_RED;
  if (rank === 1) return DOCX_ORANGE;
  if (rank === -1) return "7A8794";
  return DOCX_GREEN;
}
function docxHeading(text) {
  return new DOCX.Paragraph({
    spacing: { before: 260, after: 120 },
    border: { bottom: { color: DOCX_BLUE, space: 4, style: DOCX.BorderStyle.SINGLE, size: 12 } },
    children: [new DOCX.TextRun({ text: "  ", color: DOCX_AMBER }), new DOCX.TextRun({ text: (text || "").toUpperCase(), bold: true, color: DOCX_DARK, size: 22 })],
  });
}
function docxFieldRow(label, value) {
  return new DOCX.TableRow({ children: [
    new DOCX.TableCell({ width: { size: 3200, type: DOCX.WidthType.DXA }, shading: { type: DOCX.ShadingType.CLEAR, fill: DOCX_LIGHT }, children: [new DOCX.Paragraph({ children: [new DOCX.TextRun({ text: label, size: 18, color: "555555" })] })] }),
    new DOCX.TableCell({ width: { size: 5600, type: DOCX.WidthType.DXA }, children: [new DOCX.Paragraph({ children: [new DOCX.TextRun({ text: value || "—", size: 18, bold: true, color: DOCX_DARK })] })] }),
  ]});
}
function docxFieldTable(rows) {
  const filtered = rows.filter((r) => r[1]);
  if (filtered.length === 0) return null;
  return new DOCX.Table({ width: { size: 8800, type: DOCX.WidthType.DXA }, columnWidths: [3200, 5600], rows: filtered.map(([l, v]) => docxFieldRow(l, v)) });
}
function docxControlRow(label, detail, action, etat) {
  const children = [new DOCX.Paragraph({ children: [new DOCX.TextRun({ text: label, size: 18, color: DOCX_DARK })] })];
  if (detail) children.push(new DOCX.Paragraph({ children: [new DOCX.TextRun({ text: detail, size: 16, color: "666666", italics: true })] }));
  if (action) children.push(new DOCX.Paragraph({ children: [new DOCX.TextRun({ text: "Action : " + action, size: 16, color: "666666" })] }));
  return new DOCX.TableRow({ children: [
    new DOCX.TableCell({ width: { size: 7000, type: DOCX.WidthType.DXA }, children }),
    etat
      ? new DOCX.TableCell({ width: { size: 1800, type: DOCX.WidthType.DXA }, shading: { type: DOCX.ShadingType.CLEAR, fill: docxEtatColor(etat) }, verticalAlign: DOCX.VerticalAlign.CENTER, children: [new DOCX.Paragraph({ alignment: DOCX.AlignmentType.CENTER, children: [new DOCX.TextRun({ text: (etat || "").toUpperCase(), bold: true, color: DOCX_WHITE, size: 16 })] })] })
      : new DOCX.TableCell({ width: { size: 1800, type: DOCX.WidthType.DXA }, children: [new DOCX.Paragraph("")] }),
  ]});
}
function docxControlTable(rows) {
  if (rows.length === 0) return null;
  return new DOCX.Table({ width: { size: 8800, type: DOCX.WidthType.DXA }, columnWidths: [7000, 1800], rows: rows.map((r) => docxControlRow(...r)) });
}
// Table de synthèse : le nom de chaque équipement est un lien cliquable vers sa page dans le document.
function docxSyntheseRow(label, etat, bookmarkId) {
  const linkRun = new DOCX.TextRun({ text: label, size: 18, color: DOCX_BLUE, underline: {} });
  return new DOCX.TableRow({ children: [
    new DOCX.TableCell({ width: { size: 7000, type: DOCX.WidthType.DXA }, children: [new DOCX.Paragraph({ children: [
      bookmarkId ? new DOCX.InternalHyperlink({ anchor: bookmarkId, children: [linkRun] }) : new DOCX.TextRun({ text: label, size: 18, color: DOCX_DARK }),
    ] })] }),
    etat
      ? new DOCX.TableCell({ width: { size: 1800, type: DOCX.WidthType.DXA }, shading: { type: DOCX.ShadingType.CLEAR, fill: docxEtatColor(etat) }, verticalAlign: DOCX.VerticalAlign.CENTER, children: [new DOCX.Paragraph({ alignment: DOCX.AlignmentType.CENTER, children: [new DOCX.TextRun({ text: (etat || "").toUpperCase(), bold: true, color: DOCX_WHITE, size: 16 })] })] })
      : new DOCX.TableCell({ width: { size: 1800, type: DOCX.WidthType.DXA }, children: [new DOCX.Paragraph("")] }),
  ]});
}
function docxSyntheseTable(site) {
  if (site.equipements.length === 0) return null;
  return new DOCX.Table({ width: { size: 8800, type: DOCX.WidthType.DXA }, columnWidths: [7000, 1800], rows: site.equipements.map((eq) =>
    docxSyntheseRow(eq.type + (eq.identification.repere ? " — " + eq.identification.repere : ""), eq.etatFinal, docxBookmarkId(eq))
  )});
}
// Word n'accepte que lettres/chiffres/underscore dans un nom de repère (bookmark), 40 caractères max.
function docxBookmarkId(eq) { return "equip_" + eq.id.replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 32); }
function docxEquipHeader(name, bookmarkId) {
  const title = new DOCX.TextRun({ text: (name || "").toUpperCase(), bold: true, color: DOCX_WHITE, size: 24 });
  return new DOCX.Table({ width: { size: 8800, type: DOCX.WidthType.DXA }, columnWidths: [8800], rows: [new DOCX.TableRow({ children: [new DOCX.TableCell({
    width: { size: 8800, type: DOCX.WidthType.DXA }, shading: { type: DOCX.ShadingType.CLEAR, fill: DOCX_DARK },
    children: [new DOCX.Paragraph({ spacing: { before: 80, after: 80 }, children: [bookmarkId ? new DOCX.Bookmark({ id: bookmarkId, children: [title] }) : title] })],
  })] })] });
}
function docxSpacer(h) { return new DOCX.Paragraph({ spacing: { after: h || 120 }, children: [] }); }
function base64ToUint8(dataUrl) {
  try {
    const base64 = dataUrl.split(",")[1];
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch (e) { return null; }
}
function docxImage(dataUrl, w, h) {
  const bytes = base64ToUint8(dataUrl);
  if (!bytes) return null;
  const type = dataUrl.includes("image/png") ? "png" : dataUrl.includes("image/jpeg") || dataUrl.includes("image/jpg") ? "jpg" : null;
  if (!type) return null;
  try { return new DOCX.ImageRun({ data: bytes, type, transformation: { width: w || 160, height: h || 120 } }); } catch (e) { return null; }
}

function docxEquipementElements(eq) {
  const schema = SCHEMAS[eq.type];
  const elements = [new DOCX.Paragraph({ children: [new DOCX.PageBreak()] }), docxEquipHeader(eq.type, docxBookmarkId(eq)), docxSpacer(80)];
  if (schema.identification.length) {
    const t = docxFieldTable(schema.identification.map((f) => [f.label, eq.identification[f.key]]));
    if (t) { elements.push(t); elements.push(docxSpacer()); }
  }
  const isRelais = TYPES_AVEC_RELAIS.includes(eq.type);
  schema.sections.forEach((sec) => {
    if (isRelais && sec.key === "parametrage_relais") {
      elements.push(docxHeading(sec.title));
      const seuils = eq.controles.parametrage_relais_seuils || [];
      if (seuils.length === 0) {
        elements.push(new DOCX.Paragraph({ children: [new DOCX.TextRun({ text: "Aucun seuil paramétré", size: 18, color: "666666" })] }));
      } else {
        seuils.forEach((s) => {
          const detail = [s.fields.etat && `État : ${s.fields.etat}`, s.fields.courbe && `Courbe : ${s.fields.courbe}`, s.fields.type && `Type : ${s.fields.type}`,
            s.fields.reglage && `Réglage : ${s.fields.reglage} A`, s.fields.temporisation && `Temporisation : ${s.fields.temporisation} ${s.fields.temporisation_unite || ""}`].filter(Boolean).join(" · ");
          elements.push(new DOCX.Paragraph({ spacing: { after: 60 }, children: [new DOCX.TextRun({ text: (s.label || "(seuil sans nom)") + (detail ? " — " + detail : ""), size: 18 })] }));
        });
      }
      elements.push(docxSpacer());
      return;
    }
    if (isRelais && sec.key === "controles_relais") {
      elements.push(docxHeading(sec.title));
      const rows = [];
      (eq.controles.parametrage_relais_seuils || []).filter((s) => s.label).forEach((s) => {
        const tol = calcToleranceEssai(s.fields.temporisation, s.fields.temporisation_unite);
        const detail = [s.essai.fields.l1 && `L1 : ${s.essai.fields.l1}`, s.essai.fields.l2 && `L2 : ${s.essai.fields.l2}`, s.essai.fields.l3 && `L3 : ${s.essai.fields.l3}`,
          s.essai.fields.courant_injecte && `Courant injecté : ${s.essai.fields.courant_injecte} A`, tol && `Tolérance attendue : ${tol.min} – ${tol.max} ${tol.unite}`].filter(Boolean).join(" · ");
        rows.push(["Essai de déclenchement — " + s.label, detail, s.essai.action, s.essai.etat]);
      });
      const circuit = eq.controles.controles_relais.circuit_mesures_commande;
      rows.push(["Contrôle du circuit de mesures et commande", "", circuit.action, circuit.etat]);
      const t = docxControlTable(rows);
      if (t) elements.push(t);
      elements.push(docxSpacer());
      return;
    }
    if (eq.type === "Analyse d'huile" && sec.key === "resultats") {
      elements.push(docxHeading(sec.title));
      const rows = sec.items.filter((item) => eq.controles[sec.key][item.key].fields.realise === "OUI").map((item) => {
        const value = eq.controles[sec.key][item.key];
        const parts = printFieldParts(item, value);
        return [item.label, parts.join(" · "), value.action, value.etat];
      });
      const t = docxControlTable(rows);
      if (t) elements.push(t);
      else elements.push(new DOCX.Paragraph({ children: [new DOCX.TextRun({ text: "Aucune analyse renseignée", size: 18, color: "666666" })] }));
      elements.push(docxSpacer());
      return;
    }
    elements.push(docxHeading(sec.title));
    const rows = sec.items.map((item) => {
      const value = eq.controles[sec.key][item.key];
      const parts = printFieldParts(item, value);
      return [item.label, parts.join(" · "), value.action, value.etat];
    });
    const custom = eq.controles[sec.key + "__custom"] || [];
    custom.forEach((c) => rows.push([c.label || "(action ajoutée)", "", c.action, c.etat]));
    const t = docxControlTable(rows);
    if (t) elements.push(t);
    elements.push(docxSpacer());
  });
  if (eq.type === "Disjoncteur BT") {
    const brk = computeBRKValues(eq);
    elements.push(new DOCX.Paragraph({ spacing: { after: 60 }, children: [new DOCX.TextRun({ text: `Ir (calculé) : ${brk.Ir || "—"} A · Im (calculé) : ${brk.Im || "—"} A`, size: 18, bold: true })] }));
    elements.push(new DOCX.Paragraph({ children: [new DOCX.TextRun({ text: `Surcharge longue — Valise STR : ${brk.valiseSTR_SL} mA · Valise IS : ${brk.valiseIS_SL} A`, size: 16 })] }));
    elements.push(new DOCX.Paragraph({ children: [new DOCX.TextRun({ text: `Court-circuit temporisé — Valise STR : ${brk.valiseSTR_CC} mA · Valise IS : ${brk.valiseIS_CC} A`, size: 16 })] }));
    elements.push(new DOCX.Paragraph({ spacing: { after: 80 }, children: [new DOCX.TextRun({ text: `Instantané — Valise IS : ${brk.valiseIS_Inst} A`, size: 16 })] }));
  }
  elements.push(new DOCX.Paragraph({
    border: { top: { color: DOCX_BLUE, space: 4, style: DOCX.BorderStyle.SINGLE, size: 8 } }, spacing: { before: 120, after: 60 },
    children: [new DOCX.TextRun({ text: "Synthèse de l'état — à l'issue de la maintenance : ", bold: true, size: 18, color: DOCX_DARK }), new DOCX.TextRun({ text: (eq.etatFinal || "").toUpperCase(), bold: true, size: 18, color: docxEtatColor(eq.etatFinal) })],
  }));
  if (eq.remarques) elements.push(new DOCX.Paragraph({ spacing: { after: 80 }, children: [new DOCX.TextRun({ text: "Remarques : ", bold: true, size: 18 }), new DOCX.TextRun({ text: eq.remarques, size: 18 })] }));
  (eq.photos || []).forEach((p) => { const img = docxImage(p.dataUrl, 200, 150); if (img) elements.push(new DOCX.Paragraph({ spacing: { after: 40 }, children: [img] })); });
  const attachedFiles = [...(eq.courbeFiles || []), ...(eq.rapportLaboFiles || [])];
  attachedFiles.forEach((f) => {
    if (f.isPdf) {
      elements.push(new DOCX.Paragraph({ spacing: { after: 40 }, children: [new DOCX.TextRun({ text: "Pièce jointe (PDF) : " + (f.name || "document.pdf"), size: 16, color: DOCX_BLUE, italics: true })] }));
    } else {
      const img = docxImage(f.dataUrl, 200, 150);
      if (img) elements.push(new DOCX.Paragraph({ spacing: { after: 40 }, children: [img] }));
    }
  });
  return elements;
}

function docxCoverPage(site) {
  const logoImg = docxImage(LOGO_DARK, 140, 140);
  const dateGeneration = new Date().toLocaleDateString("fr-FR");
  return [
    new DOCX.Table({ width: { size: 12240, type: DOCX.WidthType.DXA }, columnWidths: [12240], rows: [new DOCX.TableRow({ children: [new DOCX.TableCell({
      width: { size: 12240, type: DOCX.WidthType.DXA }, shading: { type: DOCX.ShadingType.CLEAR, fill: DOCX_AMBER },
      children: [new DOCX.Paragraph({ spacing: { before: 0, after: 0 }, children: [new DOCX.TextRun({ text: " ", size: 4 })] })],
    })] })] }),
    new DOCX.Paragraph({ spacing: { before: 2200, after: 0 }, children: [] }),
    new DOCX.Paragraph({ alignment: DOCX.AlignmentType.CENTER, children: logoImg ? [logoImg] : [] }),
    new DOCX.Paragraph({ spacing: { before: 500, after: 0 }, alignment: DOCX.AlignmentType.CENTER, children: [
      new DOCX.TextRun({ text: "RAPPORT DE MAINTENANCE PRÉVENTIVE HT / BT / CONVERSION D'ÉNERGIE", bold: true, color: "8B96A3", size: 20 }),
    ]}),
    new DOCX.Paragraph({ spacing: { before: 500, after: 0 }, alignment: DOCX.AlignmentType.CENTER, children: [
      new DOCX.TextRun({ text: site.nom || "Site", bold: true, color: DOCX_DARK, size: 56 }),
    ]}),
    new DOCX.Paragraph({ spacing: { before: 260, after: 0 }, alignment: DOCX.AlignmentType.CENTER, children: [
      new DOCX.TextRun({ text: site.client || "", color: "5B6B7D", size: 28 }),
    ]}),
    site.local ? new DOCX.Paragraph({ spacing: { before: 60, after: 0 }, alignment: DOCX.AlignmentType.CENTER, children: [
      new DOCX.TextRun({ text: "Local : " + site.local, color: "8B96A3", size: 22 }),
    ]}) : new DOCX.Paragraph({}),
    new DOCX.Paragraph({ spacing: { before: 900, after: 0 }, alignment: DOCX.AlignmentType.CENTER, border: { top: { color: "D8DEE5", space: 8, style: DOCX.BorderStyle.SINGLE, size: 4 } }, children: [] }),
    new DOCX.Paragraph({ spacing: { before: 300, after: 0 }, alignment: DOCX.AlignmentType.CENTER, children: [
      new DOCX.TextRun({ text: "Rapport généré le " + dateGeneration, color: "8B96A3", size: 20, italics: true }),
    ]}),
    new DOCX.Paragraph({ spacing: { before: 2000, after: 0 }, alignment: DOCX.AlignmentType.CENTER, children: [
      new DOCX.TextRun({ text: "HT MAINTENANCE", bold: true, color: DOCX_BLUE, size: 24 }),
    ]}),
    new DOCX.Paragraph({ spacing: { before: 40, after: 0 }, alignment: DOCX.AlignmentType.CENTER, children: [
      new DOCX.TextRun({ text: "Maintenance électrique HTA / BT", color: "8B96A3", size: 18 }),
    ]}),
    new DOCX.Paragraph({ children: [new DOCX.PageBreak()] }),
  ];
}

async function generateSiteDocx(site) {
  await ensureDocx();
  const rank = overallRank(site);
  const rankLabel = rankToLabel(rank);
  const logoImg = docxImage(LOGO_DARK, 46, 46);
  const headerTable = new DOCX.Table({ width: { size: 8800, type: DOCX.WidthType.DXA }, columnWidths: [8800], rows: [new DOCX.TableRow({ children: [new DOCX.TableCell({
    width: { size: 8800, type: DOCX.WidthType.DXA }, shading: { type: DOCX.ShadingType.CLEAR, fill: DOCX_DARK },
    children: [
      new DOCX.Paragraph({ spacing: { before: 160, after: 20 }, children: [...(logoImg ? [logoImg] : []), new DOCX.TextRun({ text: "   RAPPORT DE MAINTENANCE PRÉVENTIVE HT / BT / CONVERSION D'ÉNERGIE — " + rankLabel.toUpperCase(), color: DOCX_SILVER, size: 16 })] }),
      new DOCX.Paragraph({ spacing: { after: 10 }, children: [new DOCX.TextRun({ text: site.nom || "Site", bold: true, color: DOCX_WHITE, size: 30 })] }),
      new DOCX.Paragraph({ spacing: { after: 160 }, children: [new DOCX.TextRun({ text: [site.client, site.local].filter(Boolean).join(" — "), color: DOCX_SILVER, size: 20 })] }),
    ],
  })] })] });

  const syntheseTable = docxSyntheseTable(site);

  const rapportRows = [
    ["Date", site.rapport.date], ["Intervenant", site.rapport.intervenant],
    ["Heure d'arrivée", site.rapport.heureArrivee], ["Heure de fin", site.rapport.heureFin],
    ["Marque", site.rapport.marque], ["Année de mise en service", site.rapport.anneeMiseEnService],
    ["Courant assigné (Ir)", site.rapport.courantAssigne], ["Tension assignée (Ur)", site.rapport.tensionAssignee],
    ["Nombre d'équipements", site.rapport.nombreEquipements], ["Prochaine maintenance recommandée avant", site.rapport.prochaineMaintenance],
    ["Environnement", [site.rapport.environnementEtat, site.rapport.environnementRemarque].filter(Boolean).join(" — ")],
    ["Fonctionnement de l'installation", [site.rapport.fonctionnementEtat, site.rapport.fonctionnementRemarque].filter(Boolean).join(" — ")],
  ];

  const children = [...docxCoverPage(site), headerTable, docxSpacer(160)];
  if (syntheseTable) { children.push(docxHeading("Synthèse des équipements")); children.push(syntheseTable); children.push(docxSpacer()); }
  children.push(docxHeading("Rapport"));
  const rapportTable = docxFieldTable(rapportRows);
  if (rapportTable) children.push(rapportTable);
  if (site.rapport.syntheseRemarques) children.push(new DOCX.Paragraph({ spacing: { before: 80, after: 80 }, children: [new DOCX.TextRun({ text: "Synthèse des remarques et préconisations : ", bold: true, size: 18 }), new DOCX.TextRun({ text: site.rapport.syntheseRemarques, size: 18 })] }));
  else children.push(docxSpacer());

  site.equipements.forEach((eq) => { children.push(...docxEquipementElements(eq)); });

  children.push(docxSpacer(200));
  children.push(new DOCX.Paragraph({ border: { top: { color: DOCX_SILVER, space: 4, style: DOCX.BorderStyle.SINGLE, size: 4 } }, spacing: { before: 100 }, children: [new DOCX.TextRun({ text: "HT Maintenance — Maintenance électrique HTA / BT", size: 14, color: "888888", italics: true })] }));

  const doc = new DOCX.Document({ sections: [{ properties: { page: { margin: { top: 500, bottom: 500, left: 600, right: 600 } } }, children }] });
  return DOCX.Packer.toBlob(doc);
}

async function generateInterventionDocx(iv) {
  await ensureDocx();
  const duree = dureeIntervention(iv.heureDebut, iv.heureFin);
  const logoImg = docxImage(LOGO_DARK, 46, 46);
  const headerTable = new DOCX.Table({ width: { size: 8800, type: DOCX.WidthType.DXA }, columnWidths: [8800], rows: [new DOCX.TableRow({ children: [new DOCX.TableCell({
    width: { size: 8800, type: DOCX.WidthType.DXA }, shading: { type: DOCX.ShadingType.CLEAR, fill: DOCX_DARK },
    children: [
      new DOCX.Paragraph({ spacing: { before: 160, after: 20 }, children: [...(logoImg ? [logoImg] : []), new DOCX.TextRun({ text: "   RAPPORT D'INTERVENTION", color: DOCX_SILVER, size: 16 })] }),
      new DOCX.Paragraph({ spacing: { after: 10 }, children: [new DOCX.TextRun({ text: iv.numeroRI || "", bold: true, color: DOCX_WHITE, size: 30 })] }),
      new DOCX.Paragraph({ spacing: { after: 160 }, children: [new DOCX.TextRun({ text: `${iv.client || ""} — ${iv.site || ""}`, color: DOCX_SILVER, size: 20 })] }),
    ],
  })] })] });

  const infoRows = [
    ["Client", iv.client], ["Site", iv.site], ["Date", iv.date], ["Technicien", iv.technicien],
    ["Heure début", iv.heureDebut], ["Heure fin", iv.heureFin], ["Durée", duree],
  ];
  const equipRows = [
    ["Type", iv.equipement.type], ["Constructeur", iv.equipement.constructeur], ["Modèle", iv.equipement.modele],
    ["N° de série", iv.equipement.numeroSerie], ["Localisation", iv.equipement.localisation], ["Référence", iv.equipement.reference],
  ];
  const natureText = NATURE_INTERVENTION.filter((n) => iv.nature[n.key]).map((n) => n.label).join(", ") || "—";
  const mesuresRows = [
    ["Isolement", iv.mesures.isolement], ["Résistance de contact", iv.mesures.resistanceContact],
    ["Temps de manœuvre", iv.mesures.tempsManoeuvre], ["Essais fonctionnels", iv.mesures.essaisFonctionnels], ["Observations", iv.mesures.observations],
  ];

  const children = [headerTable, docxSpacer(160)];
  children.push(docxHeading("Informations générales"));
  const infoTable = docxFieldTable(infoRows);
  if (infoTable) children.push(infoTable);
  children.push(docxSpacer());

  children.push(docxHeading("Équipement"));
  const equipTable = docxFieldTable(equipRows);
  if (equipTable) children.push(equipTable);
  children.push(docxSpacer());

  children.push(docxHeading("Nature de l'intervention"));
  children.push(new DOCX.Paragraph({ spacing: { after: 80 }, children: [new DOCX.TextRun({ text: natureText, size: 18 })] }));

  children.push(docxHeading("Travaux réalisés"));
  (iv.travauxActions || []).forEach((a) => {
    children.push(new DOCX.Paragraph({ spacing: { after: 20 }, children: [new DOCX.TextRun({ text: "• " + (a.action || "(action)") + (a.detail ? " — " + a.detail : ""), size: 18 })] }));
  });
  if (iv.travauxRealises) children.push(new DOCX.Paragraph({ spacing: { before: 60, after: 80 }, children: [new DOCX.TextRun({ text: iv.travauxRealises, size: 18 })] }));
  else children.push(docxSpacer());

  children.push(docxHeading("Mesures / Contrôles"));
  const mesuresTable = docxFieldTable(mesuresRows);
  if (mesuresTable) children.push(mesuresTable);
  children.push(docxSpacer());

  children.push(docxHeading("Anomalies et recommandations"));
  children.push(new DOCX.Paragraph({ spacing: { after: 80 }, children: [new DOCX.TextRun({ text: iv.anomaliesRecommandations || "—", size: 18 })] }));

  children.push(docxHeading("Conclusion"));
  children.push(new DOCX.Paragraph({ spacing: { after: 80 }, children: [new DOCX.TextRun({ text: (iv.conclusion || "").toUpperCase(), bold: true, size: 20, color: docxEtatColor(iv.conclusion) })] }));

  children.push(docxHeading("Validation"));
  const validationRows = [["Nom client", iv.validation.nomClient], ["Technicien HT Maintenance", iv.validation.technicienHT]];
  const validationTable = docxFieldTable(validationRows);
  if (validationTable) children.push(validationTable);
  children.push(docxSpacer(80));
  const sigClient = iv.validation.signatureClient ? docxImage(iv.validation.signatureClient, 220, 90) : null;
  const sigHT = iv.validation.signatureHT ? docxImage(iv.validation.signatureHT, 220, 90) : null;
  if (sigClient) { children.push(new DOCX.Paragraph({ children: [new DOCX.TextRun({ text: "Signature client :", size: 16, color: "666666" })] })); children.push(new DOCX.Paragraph({ spacing: { after: 80 }, children: [sigClient] })); }
  if (sigHT) { children.push(new DOCX.Paragraph({ children: [new DOCX.TextRun({ text: "Signature technicien :", size: 16, color: "666666" })] })); children.push(new DOCX.Paragraph({ spacing: { after: 80 }, children: [sigHT] })); }

  const doc = new DOCX.Document({ sections: [{ properties: { page: { margin: { top: 500, bottom: 500, left: 600, right: 600 } } }, children } ] });
  return DOCX.Packer.toBlob(doc);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export default function App() {
  const [sites, setSites] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [saveError, setSaveError] = useState(false);
  const [printSite, setPrintSite] = useState(null);
  const saveTimer = useRef(null);

  const [view, setView] = useState("sites"); // "sites" | "interventions" | "calendrier"
  const [interventions, setInterventions] = useState([]);
  const [ivLoaded, setIvLoaded] = useState(false);
  const [selectedIvId, setSelectedIvId] = useState(null);
  const [printIv, setPrintIv] = useState(null);
  const ivSaveTimer = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (res && res.value) setSites(JSON.parse(res.value));
      } catch (e) {
        // pas de données existantes
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        const res = await window.storage.set(STORAGE_KEY, JSON.stringify(sites), false);
        setSaveError(!res);
      } catch (e) {
        setSaveError(true);
      }
    }, 500);
    return () => clearTimeout(saveTimer.current);
  }, [sites, loaded]);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(INTERVENTIONS_STORAGE_KEY, false);
        if (res && res.value) setInterventions(JSON.parse(res.value));
      } catch (e) {
        // pas de données existantes
      }
      setIvLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!ivLoaded) return;
    if (ivSaveTimer.current) clearTimeout(ivSaveTimer.current);
    ivSaveTimer.current = setTimeout(async () => {
      try { await window.storage.set(INTERVENTIONS_STORAGE_KEY, JSON.stringify(interventions), false); } catch (e) { /* best effort */ }
    }, 500);
    return () => clearTimeout(ivSaveTimer.current);
  }, [interventions, ivLoaded]);

  // Génère le rapport (Rapport ou Rapport d'intervention) et le télécharge en .docx
  // réel (compatible Microsoft Word ET Pages sur Mac), entièrement modifiable.
  useEffect(() => {
    if (!printSite && !printIv) return;
    let cancelled = false;
    (async () => {
      try {
        if (printSite) {
          const blob = await generateSiteDocx(printSite);
          if (!cancelled) downloadBlob(blob, `Rapport_${(printSite.nom || printSite.local || "site").replace(/[^a-z0-9]+/gi, "_")}.docx`);
        } else if (printIv) {
          const blob = await generateInterventionDocx(printIv);
          if (!cancelled) downloadBlob(blob, `RI_${(printIv.numeroRI || "intervention").replace(/[^a-z0-9]+/gi, "_")}.docx`);
        }
      } catch (e) {
        // best effort — génération impossible (ex. données incomplètes)
      }
      if (!cancelled) { setPrintSite(null); setPrintIv(null); }
    })();
    return () => { cancelled = true; };
  }, [printSite, printIv]);

  function updateSite(id, updater) { setSites((prev) => prev.map((s) => (s.id === id ? updater(s) : s))); }
  function addSite() {
    const s = emptySite();
    setSites((prev) => [s, ...prev]);
    setSelectedId(s.id);
  }
  function addSiteForDate(dateISO) {
    const s = emptySite();
    s.rapport.date = dateISO;
    setSites((prev) => [s, ...prev]);
    setSelectedId(s.id);
  }
  function deleteSite(id) {
    setSites((prev) => prev.filter((s) => s.id !== id));
    setSelectedId(null);
  }

  function updateIntervention(id, updater) { setInterventions((prev) => prev.map((iv) => (iv.id === id ? updater(iv) : iv))); }
  function createIntervention(site, eq) {
    const numeroRI = nextNumeroRI(interventions);
    const iv = site ? prefillInterventionFromSite(site, eq, numeroRI) : emptyIntervention(numeroRI);
    setInterventions((prev) => [iv, ...prev]);
    setSelectedId(null);
    setSelectedIvId(iv.id);
  }
  function addInterventionForDate(dateISO) {
    const iv = emptyIntervention(nextNumeroRI(interventions));
    iv.date = dateISO;
    setInterventions((prev) => [iv, ...prev]);
    setSelectedIvId(iv.id);
  }
  function deleteIntervention(id) {
    setInterventions((prev) => prev.filter((iv) => iv.id !== id));
    setSelectedIvId(null);
  }

  // Sauvegarde manuelle : exporte toutes les données (sites + rapports d'intervention) dans un
  // fichier téléchargeable, et permet de les recharger ensuite (autre appareil, restauration…).
  const importInputRef = useRef(null);
  const [importError, setImportError] = useState(false);

  function exportData() {
    const payload = { app: "HT Maintenance", version: 1, exportedAt: new Date().toISOString(), sites, interventions };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const filename = `HT-Maintenance_sauvegarde_${todayISO()}.json`;
    downloadBlob(blob, filename);
  }

  function importData(file) {
    setImportError(false);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!Array.isArray(data.sites) || !Array.isArray(data.interventions)) throw new Error("format invalide");
        setSites(data.sites);
        setInterventions(data.interventions);
      } catch (err) {
        setImportError(true);
      }
    };
    reader.onerror = () => setImportError(true);
    reader.readAsText(file);
  }

  const selected = sites.find((s) => s.id === selectedId) || null;
  const selectedIv = interventions.find((iv) => iv.id === selectedIvId) || null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');
        .print-only { display: none; }
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
        }
        .app-shell { padding: 24px; }
        .site-row, .iv-row { display: flex; align-items: center; gap: 14px; }
        .site-row-meta, .iv-row-meta { flex: 0 0 130px; }
        @media (max-width: 720px) {
          .app-shell { padding: 12px; }
          .site-row, .iv-row { flex-wrap: wrap; align-items: flex-start; gap: 6px 14px; padding: 12px !important; }
          .site-row-main, .iv-row-main { flex-basis: 100% !important; order: -1; }
          .site-row-meta, .iv-row-meta { flex: 1 1 auto !important; width: auto !important; }
          .tab-bar-scroll { overflow-x: auto; flex-wrap: nowrap !important; -webkit-overflow-scrolling: touch; padding-bottom: 4px; }
          .tab-bar-scroll::-webkit-scrollbar { height: 4px; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      <div className="no-print app-shell" style={{ position: "relative", minHeight: "100%", background: "#F1F3F6", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: "#1A1F26" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src={LOGO_DARK} alt="HT Maintenance" style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover", boxShadow: "0 6px 18px rgba(10,93,168,0.35)" }} />
              <div>
                <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: 0.3, fontFamily: "'Rajdhani', 'Inter', sans-serif", textTransform: "uppercase" }}>
                  HT <span style={{ color: BRAND.amber }}>Maintenance</span>
                </h1>
                <div style={{ fontSize: 12, color: "#5B6B7D" }}>
                  {selected ? "Fiche site" : selectedIv ? "Rapport d'intervention" : view === "sites" ? "Suivi des interventions de maintenance préventive HT" : view === "interventions" ? "Rapports d'intervention" : "Calendrier des interventions"}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              {!selected && !selectedIv && (
                <>
                  <button onClick={exportData} style={btnGhost()} title="Télécharger une sauvegarde de toutes les données">
                    <Download size={14} /> <span className="hide-mobile">Sauvegarder</span>
                  </button>
                  <button onClick={() => importInputRef.current && importInputRef.current.click()} style={btnGhost()} title="Recharger une sauvegarde précédente">
                    <Upload size={14} /> <span className="hide-mobile">Restaurer</span>
                  </button>
                  <input
                    ref={importInputRef}
                    type="file"
                    accept="application/json"
                    style={{ display: "none" }}
                    onChange={(e) => { if (e.target.files && e.target.files[0]) importData(e.target.files[0]); e.target.value = ""; }}
                  />
                </>
              )}
              {!selected && !selectedIv && view === "sites" && <button onClick={addSite} style={btnPrimary()}><Plus size={16} /> Nouveau site</button>}
            </div>
          </div>
          {importError && (
            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", color: "#B91C1C", borderRadius: 10, padding: "10px 14px", fontSize: 12.5, marginBottom: 14 }}>
              Le fichier sélectionné n'est pas une sauvegarde valide. Vérifiez que vous avez bien choisi un fichier exporté depuis cette application.
            </div>
          )}

          {!selected && !selectedIv && (
            <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
              <button onClick={() => setView("sites")} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 999,
                border: view === "sites" ? "1px solid #FFC10755" : "1px solid #D8DEE5", background: view === "sites" ? "rgba(255,193,7,0.12)" : "transparent",
                color: view === "sites" ? BRAND.amber : "#5B6B7D", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
              }}>
                <Building2 size={13} /> Sites
              </button>
              <button onClick={() => setView("interventions")} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 999,
                border: view === "interventions" ? "1px solid #FFC10755" : "1px solid #D8DEE5", background: view === "interventions" ? "rgba(255,193,7,0.12)" : "transparent",
                color: view === "interventions" ? BRAND.amber : "#5B6B7D", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
              }}>
                <ClipboardList size={13} /> Rapports d'intervention
              </button>
              <button onClick={() => setView("calendrier")} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 999,
                border: view === "calendrier" ? "1px solid #FFC10755" : "1px solid #D8DEE5", background: view === "calendrier" ? "rgba(255,193,7,0.12)" : "transparent",
                color: view === "calendrier" ? BRAND.amber : "#5B6B7D", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
              }}>
                <Clock size={13} /> Calendrier
              </button>
            </div>
          )}

          {saveError && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#B91C1C", borderRadius: 10, padding: "10px 14px", fontSize: 12.5, marginBottom: 14 }}>
              La sauvegarde a échoué — vos dernières modifications ne sont peut-être pas enregistrées.
            </div>
          )}

          {selected ? (
            <SiteDetail site={selected} update={(updater) => updateSite(selected.id, updater)} onBack={() => setSelectedId(null)} onDelete={deleteSite} onPrint={setPrintSite} onCreateIntervention={createIntervention} />
          ) : selectedIv ? (
            <InterventionEditor iv={selectedIv} update={(updater) => updateIntervention(selectedIv.id, updater)} onBack={() => setSelectedIvId(null)} onDelete={deleteIntervention} onPrint={setPrintIv} />
          ) : view === "sites" ? (
            !loaded ? <div style={{ textAlign: "center", padding: 60, color: "#8B96A3", fontSize: 13 }}>Chargement…</div> : <Overview sites={sites} onOpen={setSelectedId} onNew={addSite} />
          ) : view === "interventions" ? (
            !ivLoaded ? <div style={{ textAlign: "center", padding: 60, color: "#8B96A3", fontSize: 13 }}>Chargement…</div> : <InterventionsOverview interventions={interventions} sites={sites} onOpen={setSelectedIvId} onCreate={createIntervention} />
          ) : (
            !loaded || !ivLoaded ? <div style={{ textAlign: "center", padding: 60, color: "#8B96A3", fontSize: 13 }}>Chargement…</div> : (
              <CalendarView sites={sites} interventions={interventions} onOpenSite={setSelectedId} onOpenIntervention={setSelectedIvId} onCreateForDate={addSiteForDate} onCreateInterventionForDate={addInterventionForDate} />
            )
          )}
        </div>
      </div>
    </>
  );
}

