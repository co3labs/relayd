import { ABIFunc } from '../@types/types';

export function parseABI(abi: string) {
  console.log(abi);
  return JSON.parse(abi);
}

export function getUsableFunctions(abi: ABIFunc[]) {
  return abi.filter(
    ({ stateMutability, type }) =>
      type === 'function' && (stateMutability === 'payable' || stateMutability === 'nonpayable')
  );
}

export function getParameters(abi: ABIFunc[], name: string) {
  const func = abi.find(({ name }) => name === name);
  return func?.inputs;
}

export function getFunctionNames(abi: ABIFunc[]) {
  const functions = getUsableFunctions(abi);
  return functions.map(({ name }) => name);
}
