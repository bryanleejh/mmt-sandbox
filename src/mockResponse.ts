export const mockResponse = {
  rules_builder_metadata: [
    {
      name: "Inventory Targeting",
      id: "inventory_targeting",
      rules: [
        {
          id: "inventory_targeting.screen_type",
          display_name: "Screen Type",
          supported_comparator: ["=", "!=", "in"],
          supported_type: "string",
          values: [
            {
              id: "home",
              name: "Home",
              value: "home",
            },
            {
              id: "rlp",
              name: "RLP",
              value: "rlp",
            },
          ],
        },
        {
          id: "inventory_targeting.placement_type",
          display_name: "Placement Type",
          supported_comparator: ["=", "!=", "in"],
          supported_type: "string",
          values: [
            {
              id: "swimlanes",
              name: "Swimlanes",
              value: "swimlanes",
            },
            {
              id: "list",
              name: "List",
              value: "list",
            },
          ],
        },
      ],
    },

    {
      name: "Audience Targeting",
      id: "audience_targeting",
      rules: [],
    },
  ],
};
