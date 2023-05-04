// Data interface

export interface IWilder {
    id: number;
    name: string;
    city: string;
    skill: ISkill[];
}

export interface ISkill {
    title: string;
    votes: number;
}

export interface ISkillData{
    id:number
    name:string
}

//  component interface 

export interface IHeader {
    title: string;
}

export interface ICardGroupe {
    title: string;
    skillsData: ISkillData[];
    wilders: IWilder[];
    fetchData: () => void;
  }

export interface IWilderCard {
    id: number;
    name: string;
    city: string;
    skills?: ISkill[];
    onDelete: (id: number) => void;
    fetchData: () => void;
    skillsData:  ISkillData[];   
}

// Form interface 
export interface IAddWilder {  
    fetchData: () => void;
    type: string;
}

export interface IAddWilderUpdate {
    fetchData: () => void;
    type: string;
    id?: number;
    handleActif: () => void;
    nameW?: string;
    cityW?: string;
}

export interface IFromSkill{
    fetchData: () => void;
}