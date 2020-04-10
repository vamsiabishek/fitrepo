import Purchases from 'react-native-purchases';

export const getEntitlementsByPurchaseId = async (purchaseId) => {
  Purchases.setDebugLogsEnabled(true);
  Purchases.setup('jQPiwHOTRHEdxnhBjjUsqYtOHRBnjSOH', purchaseId);
  const purchaserInfo = await Purchases.getPurchaserInfo();
  return purchaserInfo.entitlements;
};

export const getPurchaserInfo = async () => await Purchases.getPurchaserInfo();

export const getActiveEntitlements = async () => {
  const purchaserInfo = await getPurchaserInfo();
  return await purchaserInfo.getActiveEntitlements();
};

export const getPurchaserInfoAndActiveEntitlements = async () => {
  const purchaserInfo = await getPurchaserInfo();
  const activeEntitlements = await purchaserInfo.getActiveEntitlements();
  return {
    purchaserInfo,
    activeEntitlements,
  };
};

export const makePurchase = async (identifier) =>
  await makePurchase(identifier);

export const restoreTransactions = async () =>
  await Purchases.restoreTransactions();
