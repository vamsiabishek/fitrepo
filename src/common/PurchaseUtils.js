// So for Purchases we have:
// Offerings: {all:{standard:{}, diwaliSpecial: {}}, current: {standard: {}}}
// offerings contain all and current. Current is the standard diet offerings that we provide
// each of these offerings like standard internally contain 'availablePackages' which is an array
// inside each of availablePackages we have a package like [four_week_beginner, eight_week_beginner, ...etc ]
// inide each of four_week_beginner we have two products one for each ios and android i.e., four_week_B_diet_plan(ios) and four_week_1_diet_plan_android(android)

import Purchases from 'react-native-purchases';

export let purchaseOfferings = null;

// This method is deprecated, hence not using
/*export const getEntitlementsByPurchaseId = async (purchaseID) => {
  Purchases.setDebugLogsEnabled(true);
  Purchases.setup('jQPiwHOTRHEdxnhBjjUsqYtOHRBnjSOH', purchaseID);
  const purchaserOfferings = await Purchases.getOfferings();
  //console.log(purchaserOfferings);
  const {current: currentDietPlans} = purchaserOfferings; // current contains standard
  purchaseOfferings = currentDietPlans;
  return purchaseOfferings;
};*/

export const getOfferingsByPurchaseId = async (purchaseID) => {
  Purchases.setDebugLogsEnabled(true);
  Purchases.setup('jQPiwHOTRHEdxnhBjjUsqYtOHRBnjSOH', purchaseID);
  const purchaserOfferings = await Purchases.getOfferings();
  const {current: currentDietPlans} = purchaserOfferings; // current contains standard
  purchaseOfferings = currentDietPlans;
  return purchaseOfferings;
};

export const getPurchaserInfo = async () => await Purchases.getPurchaserInfo();

export const getActiveEntitlement = async (purchaserInfo) => {
  console.log('Inside getActiveEntitlements.');
  if (!purchaserInfo) {
    purchaserInfo = await getPurchaserInfo();
  }
  return purchaserInfo.entitlements.active; // active is an array where 0th element is latest purchase which is again an array active:[['entitlementName',{identifier, latestPurchaseDate,...}]]
};

export const getPurchaserInfoAndActiveEntitlements = async () => {
  const purchaserInfo = await getPurchaserInfo();
  const activeEntitlements = purchaserInfo.entitlements.active;
  return {
    purchaserInfo,
    activeEntitlements,
  };
};

export const makePurchase = async (packageToBuy) =>
  await Purchases.purchasePackage(packageToBuy);

export const restoreTransactions = async () =>
  await Purchases.restoreTransactions();

export const getPurchasePlanByFitnessLevelAndWeek = (
  week,
  fitnessLevel,
  offerings,
) => {
  const productName = constructProductName(week, fitnessLevel);
  if (offerings) {
    const {availablePackages} = offerings;
    return availablePackages.find(
      (product) => productName === product.identifier,
    );
  }
  return null;
};

const constructProductName = (week, fitnessLevel) => {
  let fitnessCode = 'beginner'; // fitness code for beginner in android is 1 and ios is B
  if (fitnessLevel === 2) {
    fitnessCode = 'intermediate';
  } else if (fitnessLevel === 3) {
    fitnessCode = 'advanced';
  }
  switch (week) {
    case 4:
      return `four_week_${fitnessCode}`;
    case 8:
      return `eight_week_${fitnessCode}`;
    case 12:
      return `twelve_week_${fitnessCode}`;
    case 16:
      return `sixteen_week_${fitnessCode}`;
  }
};
