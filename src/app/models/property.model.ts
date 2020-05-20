export class Property {
      constructor(
            public propID: string,
            public title: string,
            public description: string,
            public location: string,
            public sale_or_rent: string,
            public featured: boolean,
            public area_size: number,
            public year_built: number,
            public beds: number,
            public baths: number,
            public garages: number,
            public features: string[],
            public imageSm_Path: string,
            public imageLg_Path: string,
            public lat: number,
            public lng: number,
            public price: number) { }
}