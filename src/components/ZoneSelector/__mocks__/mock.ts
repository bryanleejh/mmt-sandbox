import { GET_AREAS_QUERY, GET_CITIES_V2_QUERY } from '../../../graphql/queries';

export const mockFormState = [
  {
    city: 'sg-singapore',
    regions: [
      {
        region: '4829894c-61a5-437a-a1b4-1d64b4a4a38b',
        districts: ['5da9cdfa-30ce-4bc3-a5fb-f396045c5b27', '4f539cb6-dafe-4ede-bdbe-1dc23be8d89d'],
      },
      {
        region: '0cff5b26-3bfd-4e09-bf54-6d84753c375e',
      },
      {
        region: '17547184-5b38-44b4-a03e-836abdf7f00d',
      },
      {
        region: '38d72412-d42a-40f4-9c1d-38f653ba04a7',
      },
    ],
  },
];

export const mockDisplayState = {
  cities: [{ id: 'sg-singapore', indeterminate: true }],
  regions: [
    { id: '4829894c-61a5-437a-a1b4-1d64b4a4a38b', indeterminate: true },
    { id: '0cff5b26-3bfd-4e09-bf54-6d84753c375e', indeterminate: false },
    { id: '17547184-5b38-44b4-a03e-836abdf7f00d', indeterminate: false },
    { id: '38d72412-d42a-40f4-9c1d-38f653ba04a7', indeterminate: false },
  ],
  districts: [
    { id: '5da9cdfa-30ce-4bc3-a5fb-f396045c5b27', indeterminate: false },
    { id: '4f539cb6-dafe-4ede-bdbe-1dc23be8d89d', indeterminate: false },
  ],
};

export const mockDisplayStateWithAllDistricts = {
  cities: [{ id: 'sg-singapore', indeterminate: true }],
  regions: [
    { id: '4829894c-61a5-437a-a1b4-1d64b4a4a38b', indeterminate: true },
    { id: '0cff5b26-3bfd-4e09-bf54-6d84753c375e', indeterminate: false },
    { id: '17547184-5b38-44b4-a03e-836abdf7f00d', indeterminate: false },
    { id: '38d72412-d42a-40f4-9c1d-38f653ba04a7', indeterminate: false },
  ],
  districts: [
    {
      id: 'e8f3faec-4a97-4465-8f7f-3a2f38cd108c',
      indeterminate: false,
    },
    {
      id: '532ed65b-23e3-4c80-9d9a-1680cc37ea70',
      indeterminate: false,
    },
    {
      id: '727b2768-bbba-4ff4-a0ef-e15f3edecc55',
      indeterminate: false,
    },
    {
      id: '38d7a0ee-bbd6-4f91-b80f-d8f1c5dbee94',
      indeterminate: false,
    },
    {
      id: '4bf2e9ad-3bf3-48f8-a120-a885fb890bee',
      indeterminate: false,
    },
    {
      id: 'be4062e4-bfc5-4a7b-a0c6-495a8a50a55f',
      indeterminate: false,
    },
    {
      id: 'b46977e1-42d1-49e0-acc3-2380b7a9db7a',
      indeterminate: false,
    },
    {
      id: 'eb9a9fb2-ebc5-491e-ba40-394cba02bab1',
      indeterminate: false,
    },
    {
      id: 'c22c06d3-f9d0-46c8-9c4c-e3ffaa5adc5f',
      indeterminate: false,
    },
    {
      id: 'b9f4377d-8335-4a6f-ba9a-8b323d5cc460',
      indeterminate: false,
    },
    {
      id: '9e480164-2a08-4daf-972b-53d9573f06cc',
      indeterminate: false,
    },
    {
      id: '417891e9-2d8f-49df-9749-160a7d0dc96c',
      indeterminate: false,
    },
    {
      id: 'ffd0f70a-0dde-4788-8538-f5a23afea09f',
      indeterminate: false,
    },
    {
      id: 'c9325d7b-0301-43fb-a025-05b35f004529',
      indeterminate: false,
    },
    {
      id: '407709a4-0c9c-4da2-9f9e-ff00d0b08756',
      indeterminate: false,
    },
    {
      id: 'b353da9c-e634-4348-bbd7-6ad1d09b9ab2',
      indeterminate: false,
    },
    {
      id: '21890d1e-02e2-4281-bb9f-59e88424feb6',
      indeterminate: false,
    },
    {
      id: '8569744b-a384-4a11-9811-9071c2b9cbea',
      indeterminate: false,
    },
    {
      id: '5ad56bbc-1b7c-454a-9e35-6db7748f3862',
      indeterminate: false,
    },
    {
      id: 'cdea4d11-c54f-45e2-bbfc-18ca1df109c7',
      indeterminate: false,
    },
    {
      id: '06a76003-d4f5-4fb1-bd1b-de577705c52c',
      indeterminate: false,
    },
    {
      id: 'ec463a4b-e599-4c3c-b377-4a706cf70b56',
      indeterminate: false,
    },
  ],
};

export const mockAPIResponse = [
  {
    region: {
      id: '38d72412-d42a-40f4-9c1d-38f653ba04a7',
      name: 'North East CDC',
    },
    districts: [
      {
        id: 'bd09c63b-6068-42ce-9bad-c887536c30a8',
        name: 'North-Eastern Islands',
      },
      {
        id: 'b2eb8d3f-76cb-47fd-937d-9c585ce50bc3',
        name: 'Seletar',
      },
      {
        id: '2cb1026c-2e7a-4851-99f0-d566b1091ddb',
        name: 'Serangoon',
      },
      {
        id: '6fdb930d-e9e8-41de-bc36-309cdf437f2d',
        name: 'Ang Mo Kio',
      },
      {
        id: '846de77b-25cb-4808-828a-b83fa6f0b258',
        name: 'Hougang',
      },
      {
        id: '761862cd-6f5f-42bc-85dd-fa5235799789',
        name: 'Punggol',
      },
      {
        id: '62dc2e54-0f39-4fbd-aacd-af383f1707fa',
        name: 'Sengkang',
      },
    ],
  },
  {
    region: {
      id: '21f3b38f-56e9-4468-b1eb-45841f22d722',
      name: 'East CDC',
    },
    districts: [
      {
        id: 'e4cda189-7911-4843-8a43-103acdefcea5',
        name: 'Pasir Ris',
      },
      {
        id: '20ede6d1-adc4-4f52-870a-5c1506d52f40',
        name: 'Bedok',
      },
      {
        id: '3dde28e7-e754-4f3b-bd0d-345b53966eca',
        name: 'Changi',
      },
      {
        id: '49b4f58e-c25c-44c4-b7d2-54ae7b3ab0b8',
        name: 'Changi Bay',
      },
      {
        id: '62b2cece-c5c6-461b-a377-166efa8ec38c',
        name: 'Tampines',
      },
      {
        id: '71605021-6732-45b0-b446-34bb67ee61d5',
        name: 'Paya Lebar',
      },
    ],
  },
  {
    region: {
      id: '4829894c-61a5-437a-a1b4-1d64b4a4a38b',
      name: 'North CDC',
    },
    districts: [
      {
        id: '5da9cdfa-30ce-4bc3-a5fb-f396045c5b27',
        name: 'Simpang',
      },
      {
        id: '4f539cb6-dafe-4ede-bdbe-1dc23be8d89d',
        name: 'Sungei Kadut',
      },
      {
        id: '20145926-8849-4442-a3ef-3e230894a869',
        name: 'Lim Chu Kang',
      },
      {
        id: 'c299ef29-0e65-4f41-b2b2-96a4efda8eb7',
        name: 'Central Water Catchment',
      },
      {
        id: '43d705da-1574-4ccc-97b8-588bfb1b6786',
        name: 'Mandai',
      },
      {
        id: 'b0f5dc1f-3fa6-4b90-bdae-5926aeffcb80',
        name: 'Sembawang',
      },
      {
        id: '4e1ddc61-9092-4a2e-80ef-ed442763222c',
        name: 'Woodlands',
      },
      {
        id: 'b6bf4a71-b12f-4210-b905-565099b43647',
        name: 'Yishun',
      },
    ],
  },
  {
    region: {
      id: '0cff5b26-3bfd-4e09-bf54-6d84753c375e',
      name: 'Central Singapore CDC',
    },
    districts: [
      {
        id: 'e8f3faec-4a97-4465-8f7f-3a2f38cd108c',
        name: 'Southern Islands',
      },
      {
        id: '532ed65b-23e3-4c80-9d9a-1680cc37ea70',
        name: 'Downtown Core',
      },
      {
        id: '727b2768-bbba-4ff4-a0ef-e15f3edecc55',
        name: 'Newton',
      },
      {
        id: '38d7a0ee-bbd6-4f91-b80f-d8f1c5dbee94',
        name: 'Orchard',
      },
      {
        id: '4bf2e9ad-3bf3-48f8-a120-a885fb890bee',
        name: 'Kallang',
      },
      {
        id: 'be4062e4-bfc5-4a7b-a0c6-495a8a50a55f',
        name: 'Straits View',
      },
      {
        id: 'b46977e1-42d1-49e0-acc3-2380b7a9db7a',
        name: 'Marina East',
      },
      {
        id: 'eb9a9fb2-ebc5-491e-ba40-394cba02bab1',
        name: 'Marina South',
      },
      {
        id: 'c22c06d3-f9d0-46c8-9c4c-e3ffaa5adc5f',
        name: 'Bukit Merah',
      },
      {
        id: 'b9f4377d-8335-4a6f-ba9a-8b323d5cc460',
        name: 'Bukit Timah',
      },
      {
        id: '9e480164-2a08-4daf-972b-53d9573f06cc',
        name: 'Queenstown',
      },
      {
        id: '417891e9-2d8f-49df-9749-160a7d0dc96c',
        name: 'Bishan',
      },
      {
        id: 'ffd0f70a-0dde-4788-8538-f5a23afea09f',
        name: 'Geylang',
      },
      {
        id: 'c9325d7b-0301-43fb-a025-05b35f004529',
        name: 'Tanglin',
      },
      {
        id: '407709a4-0c9c-4da2-9f9e-ff00d0b08756',
        name: 'Toa Payoh',
      },
      {
        id: 'b353da9c-e634-4348-bbd7-6ad1d09b9ab2',
        name: 'Museum',
      },
      {
        id: '21890d1e-02e2-4281-bb9f-59e88424feb6',
        name: 'Outram',
      },
      {
        id: '8569744b-a384-4a11-9811-9071c2b9cbea',
        name: 'Marine Parade',
      },
      {
        id: '5ad56bbc-1b7c-454a-9e35-6db7748f3862',
        name: 'Novena',
      },
      {
        id: 'cdea4d11-c54f-45e2-bbfc-18ca1df109c7',
        name: 'River Valley',
      },
      {
        id: '06a76003-d4f5-4fb1-bd1b-de577705c52c',
        name: 'Rochor',
      },
      {
        id: 'ec463a4b-e599-4c3c-b377-4a706cf70b56',
        name: 'Singapore River',
      },
    ],
  },
  {
    region: {
      id: '17547184-5b38-44b4-a03e-836abdf7f00d',
      name: 'West CDC',
    },
    districts: [
      {
        id: '352ff16b-f69b-48f0-bd62-d4994e7e9375',
        name: 'Tuas',
      },
      {
        id: 'eb9d3b8c-7249-48da-acc4-376553bdcd8b',
        name: 'Western Islands',
      },
      {
        id: '68f9ed2f-383e-47c2-be06-d58e7e0c4529',
        name: 'Western Water Catchment',
      },
      {
        id: '6621ca86-7ff3-42b2-8347-128148d8e3b7',
        name: 'Tengah',
      },
      {
        id: '6a9597a3-4a7d-41a6-a8cc-96282870caca',
        name: 'Boon Lay',
      },
      {
        id: '01280b97-4c1d-4cda-8510-3183bc4462e9',
        name: 'Bukit Panjang',
      },
      {
        id: '816ee670-1201-464a-86ce-9e17d072f3a5',
        name: 'Jurong East',
      },
      {
        id: 'e9d66407-8433-4a49-98e9-db1267bbbe8b',
        name: 'Choa Chu Kang',
      },
      {
        id: 'cd299b97-a82a-4d20-aa04-b5848abdd451',
        name: 'Bukit Batok',
      },
      {
        id: 'b33175e5-fe1c-4eee-8a8f-3ecc4752498e',
        name: 'Jurong West',
      },
      {
        id: '8fa03d7d-c492-404e-9957-0edb885feb3f',
        name: 'Clementi',
      },
      {
        id: 'a2814af5-9168-4699-9fe2-43ce496e6f71',
        name: 'Pioneer',
      },
    ],
  },
];

export const mockCityObject = {
  city: 'sg-singapore',
  regions: [
    {
      region: '4829894c-61a5-437a-a1b4-1d64b4a4a38b',
      districts: ['5da9cdfa-30ce-4bc3-a5fb-f396045c5b27', '4f539cb6-dafe-4ede-bdbe-1dc23be8d89d'],
    },
    { region: '0cff5b26-3bfd-4e09-bf54-6d84753c375e' },
    { region: '17547184-5b38-44b4-a03e-836abdf7f00d' },
    { region: '38d72412-d42a-40f4-9c1d-38f653ba04a7' },
  ],
};

export const citiesResponseMock = {
  request: {
    query: GET_CITIES_V2_QUERY,
    variables: {
      country: 'FP_SG',
    },
  },
  result: {
    data: {
      citiesV2: [{ name: 'Singapore', slug: 'sg-singapore' }],
    },
  },
};

export const areasResponseMock = {
  request: {
    query: GET_AREAS_QUERY,
    variables: {
      country: 'FP_SG',
      city: 'sg-singapore',
    },
  },
  result: {
    data: {
      areas: [
        {
          region: { id: 'mock-region-1', name: 'Central' },
          districts: [
            { id: 'mock-central-district-1', name: 'Tanjong Pagar' },
            { id: 'mock-central-district-2', name: 'Chinatown' },
          ],
        },
        {
          region: { id: 'mock-region-2', name: 'East' },
          districts: [
            { id: 'mock-east-district-1', name: 'Tampines' },
            { id: 'mock-east-district-2', name: 'Pasir Ris' },
          ],
        },
      ],
    },
  },
};
