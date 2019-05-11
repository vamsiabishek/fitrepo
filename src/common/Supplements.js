const supplements = {
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
      image: require("../../assets/images/supplements/on-whey-small.jpg"),
      bestConsume: [],
      fatLoss: true,
      weightGain: true,
      healthy: true,
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
      image: require("../../assets/images/supplements/opti-men.png"),
      fatLoss: true,
      weightGain: true,
      healthy: true,
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
      image: require("../../assets/images/supplements/vit-d3-small.png"),
      fatLoss: true,
      weightGain: true,
      healthy: true,
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
      image: require("../../assets/images/supplements/vit-c-small.png"),
      fatLoss: true,
      weightGain: true,
      healthy: true,
    }
  },
  intermediate: {
    fishOil: {
      name: "Fish Oil",
      desc: "Omega 3 supplement",
      detailedDesc: "",
      brands: [
        {
          brandName: "ON(Optimum Nutrition)",
          name: "Fish oil",
          desc: "",
        },
        {
          brandName: "NOW",
          name: "Omega 3",
          desc: "",
        }
      ],
      image: require("../../assets/images/supplements/fish-oil-small.jpg"),
      fatLoss: true,
      weightGain: true,
      healthy: true,
    },
    lCarnitine: {
      name: "L-carnitine",
      desc: "Fat loss supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/l-carnitine-small.jpg"),
      fatLoss: true,
    },
    cla: {
      name: "CLA",
      desc: "Omega 6 supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/cla-small.jpg"),
      fatLoss: true,
    },
    bcaa: {
      name: "BCAA",
      desc: "Branch Chained Amino-Acid supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/BCAA-small.jpg"),
      fatLoss: true,
      weightGain: true,
    },
    creatine: {
      name: "Creatine",
      desc: "Creatine supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/creatine-small.jpg"),
      weightGain: true,
    },
    fatBurner: {
      name: "Fat Burner",
      desc: "Fat burner supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/hydroxy-fat-burner-small.jpg"),
      weightGain: true,
    },
    biotin: {
      name: "Biotin",
      desc: "Biotin supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/biotin-small.jpg"),
      fatLoss: true,
      weightGain: true,
      healthy: true,
    },
    casein: {
      name: "Casein",
      desc: "Protein supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/glutamine-small.jpg"),
      weightGain: true,
    },
  },
  advanced: {
    hmb: {
      name: "HMB",
      desc: "HMB supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/hmb-small.jpg"),
      fatLoss: true,
      weightGain: true,
      healthy: true,
      optional: true,
    },
    lGlutamine: {
      name: "L-Glutamine",
      desc: "Glutamine supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/glutamine-small.jpg"),
      fatLoss: true,
      weightGain: true,
    },
    glucosamine: {
      name: "Glucosamine",
      desc: "Joint support supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/glucosamine-small.jpg"),
      fatLoss: true,
      weightGain: true,
      healthy: true,
      optional:true,
    },
    ashwagandha: {
      name: "Ashwagandha",
      desc: "Stress releaving supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/ashwagandha.jpg"),
      fatLoss: true,
      weightGain: true,
      healthy: true,
      optional: true
    },
    tribulus: {
      name: "Tribulus gokshura",
      desc: "Testosterone booster supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/tribulus-small.jpg"),
      fatLoss: true,
      weightGain: true,
      healthy: true,
      optional: true,
    },
    coq10: {
      name: "CoQ10",
      desc: "CoQ10 supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/coq10-small.jpg"),
      fatLoss: true,
      weightGain: true,
      healthy: true,
    },
    ubiquinol: {
      name: "Ubiquinol",
      desc: "Ubiquinol supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/ubiquinol-small.jpg"),
      fatLoss: true,
      weightGain: true,
      optional: true,
      alternativeTo: "coq10",
    },
    zma: {
      name: "ZMA",
      desc: "Zinc, Magnesium and B6 supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/zma-small.jpg"),
      fatLoss: true,
      weightGain: true,
    },
    betaAlanine: {
      name: "Beta Alanine",
      desc: "Beta Alanine supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/beta-alanine-small.jpg"),
      weightGain: true,
    },
    lArginine: {
      name: "L-Arginine",
      desc: "L Arginine supplement",
      detailedDesc: "",
      brands: [],
      image: require("../../assets/images/supplements/l-arginine-small.jpg"),
      weightGain: true,
    },
  }
}

export default supplements;
