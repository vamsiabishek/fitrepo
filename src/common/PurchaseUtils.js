// So for Purchases we have:
// Offerings: {all:{standard:{}, diwaliSpecial: {}}, current: {standard: {}}}
// offerings contain all and current. Current is the standard diet offerings that we provide
// each of these offerings like standard internally contain 'availablePackages' which is an array
// inside each of availablePackages we have a package like [four_week_beginner, eight_week_beginner, ...etc ]
// inide each of four_week_beginner we have two products one for each ios and android i.e., four_week_B_diet_plan(ios) and four_week_1_diet_plan_android(android)

import Purchases from 'react-native-purchases';

export let purchaseOfferings = null;

const currentOffering = 'standard';

export const getEntitlementsByPurchaseId = async () => {
  Purchases.setDebugLogsEnabled(true);
  Purchases.setup('jQPiwHOTRHEdxnhBjjUsqYtOHRBnjSOH');
  const purchaserOfferings = await Purchases.getOfferings();
  console.log(purchaserOfferings);
  const {current: currentDietPlans} = purchaserOfferings; // current contains standard
  purchaseOfferings = currentDietPlans;
  return purchaseOfferings;
};

export const getOfferingsByPurchaseId = async () => {
  Purchases.setDebugLogsEnabled(true);
  Purchases.setup('jQPiwHOTRHEdxnhBjjUsqYtOHRBnjSOH');
  const purchaserOfferings = await Purchases.getOfferings();
  console.log(purchaserOfferings);
  const {current: currentDietPlans} = purchaserOfferings; // current contains standard
  purchaseOfferings = currentDietPlans;
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
  const productNames = constructProductNames(week, fitnessLevel);
  if (purchaseOfferings) {
    const {availablePackages} = purchaseOfferings[currentOffering];
    return availablePackages.find((product) =>
      productNames.contains(product.identifier),
    );
  }
  return null;
};

const constructProductNames = (week, fitnessLevel) => {
  let fitnessCodes = [1, 'B']; // fitness code for beginner in android is 1 and ios is B
  if (fitnessLevel === 2) {
    fitnessCodes = [2, 'I'];
  } else if (fitnessLevel === 3) {
    fitnessCodes = [3, 'A'];
  }
  switch (week) {
    case 4:
      return fitnessCodes.map((code) => `four_week_${code}`);
    case 8:
      return fitnessCodes.map((code) => `eight_week_${code}`);
    case 12:
      return fitnessCodes.map((code) => `twelve_week_${code}`);
    case 16:
      return fitnessCodes.map((code) => `sixteen_week_${code}`);
  }
};
