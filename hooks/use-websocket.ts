import { useItineraryGenerationStore } from "@/store/itinerary_generation_store";
import { useEffect, useRef, useState } from "react";

export function useWebsocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { data } = useItineraryGenerationStore.getState();
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Limpa timeout anterior se existir
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    const connectWebSocket = () => {
      // Fecha conexão anterior se existir
      if (socket) {
        socket.close();
      }

      const ws = new WebSocket("ws://192.168.1.8:8000/api/v1/travels/ws");

      ws.onopen = () => {
        console.log("conectou");

        ws.send(JSON.stringify({ task_id: data?.task_id }));
        setIsConnected(true);
      };

      ws.onclose = () => {
        console.log("desconectou");
        setIsConnected(false);

        // Reconecta após 3 segundos (opcional - remova se não quiser reconexão automática)
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, 3000);
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("recebido", message);
      };

      ws.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
      };

      setSocket(ws);
    };

    // Só conecta se tiver task_id
    if (data?.task_id) {
      connectWebSocket();
    }

    // Cleanup function
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socket) {
        socket.close();
      }
    };
  }, [data?.task_id]); // Remove isConnected das dependências

  return { socket, isConnected };
}
