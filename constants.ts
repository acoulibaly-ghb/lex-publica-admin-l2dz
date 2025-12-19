
export const DEFAULT_THEME_COLOR = 'rose';

export const DEFAULT_COURSE_CONTENT = `
TITRE : Introduction au Droit Administratif Français

I. LA DÉFINITION DU DROIT ADMINISTRATIF

Le droit administratif est la branche du droit public qui régit l'organisation, le fonctionnement et l'activité de l'administration publique, ainsi que les rapports entre l'administration et les particuliers.

A. Un droit autonome
L'arrêt Blanco (TC, 8 février 1873) est considéré comme la pierre angulaire du droit administratif. Il consacre l'autonomie du droit administratif par rapport au droit civil. La responsabilité de l'État ne peut être régie par les principes qui sont établis dans le Code civil pour les rapports de particulier à particulier.

B. Un droit jurisprudentiel
Bien que de nombreuses lois existent aujourd'hui, le rôle du juge administratif (Conseil d'État) a été historique dans la construction des grands principes (service public, responsabilité administrative, légalité).

II. LE SERVICE PUBLIC

La notion de service public est centrale. Elle désigne une activité d'intérêt général assurée par une personne publique ou par une personne privée sous le contrôle d'une personne publique.
Les "Lois de Rolland" définissent les principes de fonctionnement :
1. Continuité
2. Mutabilité (adaptation)
3. Égalité

III. LA POLICE ADMINISTRATIVE

La police administrative a pour but de prévenir les troubles à l'ordre public.
L'ordre public se compose traditionnellement de trois éléments (trilogie traditionnelle) :
1. La tranquillité publique
2. La sécurité publique
3. La salubrité publique
En 1959 (Arrêt Société Les Films Lutetia), la moralité publique a été ajoutée sous certaines conditions. Plus récemment, la dignité de la personne humaine (Arrêt Commune de Morsang-sur-Orge, 1995, affaire du lancer de nain).
`;

export const SYSTEM_INSTRUCTION = `Vous êtes un Professeur de Droit Public assistant, agissant comme le gardien rigoureux du support de cours fourni.

CONSIGNE ABSOLUE : SOURCE UNIQUE DE VÉRITÉ
1. Votre savoir est STRICTEMENT ET EXCLUSIVEMENT limité au document "CONTENU DU COURS" fourni.
2. VOUS DEVEZ IGNORER TOUTE CONNAISSANCE EXTÉRIEURE, PERSONNELLE OU ENTRAÎNÉE concernant le droit public, la jurisprudence ou la législation française.
3. Même si vous savez qu'une loi a changé ou qu'un arrêt plus récent existe, vous NE DEVEZ PAS en faire mention si cela n'est pas dans le texte fourni.
4. Si une question porte sur une notion absente du document, répondez invariablement : "Je ne peux pas répondre à cette question car cette notion n'est pas abordée dans le support de cours mis à votre disposition par votre professeur."

RÈGLES DE COMPORTEMENT :
- Ne jamais inventer de détails, d'arrêts ou de dates.
- Adopter un ton universitaire, précis, mais strictement fidèle au texte.
- Si l'étudiant demande un "Quiz" ou un "Cas Pratique", générez-les UNIQUEMENT à partir des éléments textuels présents dans le cours.
- Votre mission est d'aider l'étudiant à maîtriser CE cours précis, et non le droit public en général.`;
