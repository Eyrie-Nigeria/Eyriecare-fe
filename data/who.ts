export type Sex = "male" | "female";

export interface GrowthRef {
  L: number;
  M: number;
  S: number;
}

export interface WHOData {
  [key: string]: {
    weightForAge: {
      [age: number]: GrowthRef;
    };
  };
}

export const WHO: WHOData = {
  male: {
    weightForAge: {
      24: { L: -0.080, M: 12.2, S: 0.090 }
    }
  },
  female: {
    weightForAge: {
      24: { L: -0.067, M: 11.5, S: 0.092 }
    }
  }
};
