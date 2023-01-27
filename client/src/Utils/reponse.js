export const reponseRefuse = (post) => {
  const texte = ` Bonjour,

     Nous vous remercions de l’intérêt que vous manifestez pour le poste de ${post}. Malheureusement, nous ne pouvons donner suite à votre candidature selon les critères de sélection de l’entreprise.
     Nous vous remercions sincèrement du temps que vous nous avez consacré et de l’intérêt que vous portez à SKILL of the WORLD.
     Restez en ligne : d’autres offres d’emplois, des job dating ou encore des évènements vous attendent !
     
     Cordialement,
     L’équipe SKILL of the WORLD`;
  return texte;
};
export const reponseAttente = (post) => {
  const texte = `Bonjour,

    Nous vous remercions de l’intérêt que vous manifestez pour le poste de ${post}. Votre candidature a retenu l’attention de l’entreprise mais elle souhaite encore prendre un temps de réflexion. Votre candidature a donc été positionnée en Vivier. Si elle correspond parfaitement aux besoins, l’entreprise vous contactera très prochainement.
    Restez en ligne : d’autres offres d’emplois, des job dating ou encore des évènements vous attendent !
    
    Cordialement,
    L’équipe SKILL of the WORLD`;

  return texte;
};

export const reponseValide = (post) => {
  const texte = `Bonjour,

  Félicitations ! Votre candidature a été retenue pour le poste de ${post}. L’entreprise va vous contacter afin de réaliser un entretien de recrutement.
  Si tel n’est pas le cas d’ici une semaine, n’hésitez pas à nous contacter : contact@skilloftheworld.com
  Restez en ligne : d’autres offres d’emplois, des job dating ou encore des évènements vous attendent !
  Si votre recrutement se confirme, nous apprécions toujours de recevoir des nouvelles de nos Talents alors n’hésitez pas à nous partager votre expérience !
  
  
  Cordialement,
  L’équipe SKILL of the WORLD`;

  return texte;
};

export const messageClient = (nom,message,email ) => {
  const texte = `Bonjour, ${nom} souhaite 
  ${message}
  
  Veullez répondre à cette adresse mail ${email}`;

  return texte;
}
