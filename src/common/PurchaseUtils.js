// So for Purchases we have:
// Offerings: [advanced_diet, beginner_diet, intermediate_diet]
// each of these offerings like advanced_diet internally contain 'availablePackages' which is an array
// inside each of availablePackages we have a package like [four_week_diet, eight_week_diet, ...etc ]

import Purchases from 'react-native-purchases';

export let purchaseOfferings = null;

export const getEntitlementsByPurchaseId = async () => {
  Purchases.setDebugLogsEnabled(true);
  Purchases.setup('jQPiwHOTRHEdxnhBjjUsqYtOHRBnjSOH');
  const purchaserOfferings = await Purchases.getOfferings();
  console.log(purchaserOfferings);
  const {all: allDietPlans} = purchaserOfferings; // all contains advanced_diet, beginner_diet, intermediate_diet
  purchaseOfferings = allDietPlans;
  return purchaseOfferings;
};

export const getOfferingsByPurchaseId = async () => {
  Purchases.setDebugLogsEnabled(true);
  Purchases.setup('jQPiwHOTRHEdxnhBjjUsqYtOHRBnjSOH');
  const purchaserOfferings = await Purchases.getOfferings();
  console.log(purchaserOfferings);
  const {all: allDietPlans} = purchaserOfferings; // all contains advanced_diet, beginner_diet, intermediate_diet
  purchaseOfferings = allDietPlans;
  return purchaseOfferings;
};

export const getPurchaserInfo = async () => await Purchases.getPurchaserInfo();

export const getActiveEntitlements = async () => {
  const purchaserInfo = await getPurchaserInfo();
  return await purchaserInfo.entitlements.active;
};

export const getPurchaserInfoAndActiveEntitlements = async () => {
  const purchaserInfo = await getPurchaserInfo();
  const activeEntitlements = purchaserInfo.entitlements.active;
  return {
    purchaserInfo,
    activeEntitlements,
  };
};

export const makePurchase = async (identifier) =>
  await makePurchase(identifier);

export const restoreTransactions = async () =>
  await Purchases.restoreTransactions();

export const getPurchasePlanByFitnessLevelAndWeek = (week, fitnessLevel) => {
  let dietPlanName = 'beginner_diet'; // these are offering names in Revenue cat
  if (fitnessLevel === 2) {
    dietPlanName = 'intermediate_diet';
  } else if (fitnessLevel === 3) {
    dietPlanName = 'advanced_diet';
  }
  if (purchaseOfferings) {
    return getPackageByWeek(week, purchaseOfferings[dietPlanName]);
  }
};

const getPackageByWeek = (week, offering) => {
  if (offering) {
    switch (week) {
      case 4:
        return offering.availablePackages.find((product) =>
          product.identifier.includes('four'),
        );
      case 8:
        return offering.availablePackages.find((product) =>
          product.identifier.includes('eight'),
        );
      case 12:
        return offering.availablePackages.find((product) =>
          product.identifier.includes('twelve'),
        );
      case 16:
        return offering.availablePackages.find((product) =>
          product.identifier.includes('sixteen'),
        );
    }
  }
  return null;
};
