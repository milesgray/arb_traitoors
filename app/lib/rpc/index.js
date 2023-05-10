import { useEffect, useState } from "react";
import { FALLBACK_PROVIDERS, getFallbackRpcUrl, getRpcUrl } from "config/chains";
import { ethers } from "ethers";

export function getProvider(library, chainId) {
  let provider;

  if (library) {
    return library.getSigner();
  }

  provider = getRpcUrl(chainId);

  return new ethers.providers.StaticJsonRpcProvider(
    provider,
    { chainId }
  );
}

export function getFallbackProvider(chainId) {
  if (!FALLBACK_PROVIDERS[chainId]) {
    return;
  }

  const provider = getFallbackRpcUrl(chainId);

  return new ethers.providers.StaticJsonRpcProvider(
    provider,
    { chainId }
  );
}

export function useJsonRpcProvider(chainId) {
  const [provider, setProvider] = useState();

  useEffect(() => {
    async function initializeProvider() {
      const rpcUrl = getRpcUrl(chainId);

      if (!rpcUrl) return;

      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

      await provider.ready;

      setProvider(provider);
    }

    initializeProvider();
  }, [chainId]);

  return { provider };
}
