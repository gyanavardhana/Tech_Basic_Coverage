import socket
import threading
import random
import time

# Track active TCP clients
clients = []

def handle_tcp(conn, addr):
    print(f"[TCP] Connected by {addr}")
    clients.append(addr)
    try:
        while True:
            data = conn.recv(1024) 
            if not data:
                break
            print(f"[TCP] Received packet from {addr}: {data.decode()}")
            conn.sendall(f"Packet received: {data.decode()}".encode())  
    except Exception as e:
        print(f"[TCP] Error: {e}")
    finally:
        conn.close()
        clients.remove(addr)
        print(f"[TCP] Connection closed for {addr}")


def udp_server():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.bind(('localhost', 9998))
        print("[UDP] Server listening on port 9998")
        while True:
            data, addr = s.recvfrom(1024)  
            print(f"[UDP] Received packet from {addr}: {data.decode()}")

 
            if random.random() < 0.5:
                print(f"[UDP] Packet loss: {addr}")
                continue  
            time.sleep(random.uniform(0.5, 2)) 

            response = f"Packet received: {data.decode()}"
            s.sendto(response.encode(), addr)  


def server_console():
    while True:
        cmd = input(">> ").strip().lower()
        if cmd == "shutdown":
            print("[!] Shutting down server...")
            exit(0)
        elif cmd == "status":
            print(f"[*] Active clients: {len(clients)}")
        else:
            print("[?] Unknown command")


def tcp_server():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('localhost', 9999))
        s.listen()
        print("[TCP] Server listening on port 9999")
        while True:
            conn, addr = s.accept()
            threading.Thread(target=handle_tcp, args=(conn, addr)).start()


if __name__ == "__main__":
 
    choice = input("Start TCP or UDP server? (tcp/udp): ").strip().lower()
    if choice == "tcp":
        threading.Thread(target=tcp_server, daemon=True).start()
    elif choice == "udp":
        threading.Thread(target=udp_server, daemon=True).start()
    else:
        print("Invalid choice")
    server_console()
