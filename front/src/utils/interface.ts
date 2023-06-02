// Data interface

export interface IWilder {
    id: number;
    name: string;
    city: string;
    url:string;
    skill: ISkill[];
}

export interface ISkill {
    title: string;
    votes: number;
}

export interface ISkillData{
    id: number;
    name: string; 
}

//  component interface 

export interface IHeader {
    title: string;
}

export interface ICardGroupe {
    title: string;
    skillsData: ISkillData[];
    wilders: IWilder[];
  }

export interface IWilderCard {
    id: number;
    name: string;
    city: string;
    url:string;
    skills?: ISkill[];
    // onDelete: (id: number) => void;
    // fetchData: () => void;
    skillsData:  ISkillData[];   
}

// Form interface 
export interface IAddWilder {  
    type: string;
}

export interface IAddWilderUpdate {
    type: string;
    id?: number;
    handleActif: () => void;
    nameW?: string;
    cityW?: string;
}

export interface IFromSkill{
    fetchData: () => void;
}