import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function ({children}) {
  return (
    <LinearGradient
      colors={['#CB9257', '#FA8072']}
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
      }}>
      {children}
    </LinearGradient>
  );
}
