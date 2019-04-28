export const supplements = {
  beginner: {
    wheyConcentrate: {
      name: "Whey",
      desc: "Protein supplement",
      detailedDesc: "Completely safe as it is made out of milk",
      brands: [
        {
          brandName: "ON(Optimum Nutrition)",
          name: "ON Gold Standard whey"
        }
      ],
      image: require("../../assets/images/supplements/optimum-nutrition-gold-standard-100-whey.png"),
      bestConsume: []
    },
    multivitamin: {
      name: "Multi-Vitamin",
      desc: "Vitamins & Minerals supplement",
      detailedDesc:
        "Completely safe and necessary as we cannot get total daily nutrition value from our food sources",
      brands: [
        {
          brandName: "ON(Optimum Nutrition)",
          name: "ON Gold Standard whey"
        }
      ],
      image: require("../../assets/images/supplements/opti-men.png")
    },
    vitaminD: {
      name: "Vit D",
      desc: "Vitamin D supplement",
      detailedDesc: "Extremely necessary as it helps in production your body hormones",
      brands: [
        {
          name: "D-rise",
          desc: "Best buy from local pharmacy",
        }
      ],
      image: require("../../assets/images/supplements/Vitamin-D.png")
    },
    vitaminC: {
      name: "Vit C",
      desc: "Vitamin C supplement",
      detailedDesc: "Improves your immunity, protects you from getting sick frequently",
      brands: [
        {
          name: "LimC",
          desc: "Best buy from local pharmacy",
        }
      ],
      image: require("../../assets/images/supplements/vit-c.png")
    }
  }
};
