import socket
import time

def tcp_client():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect(('localhost', 9999))
        print("[TCP] Connected to server. Type 'exit' to quit.")
        while True:
            msg = input("You: ")
            if msg.lower() == 'exit':
                break
            s.sendall(msg.encode())  # Send packet
            data = s.recv(1024)  # Receive response
            print("Server:", data.decode())


def udp_client():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        print("[UDP] Ready. Type 'exit' to quit.")
        s.settimeout(2)
        server_address = ('localhost', 9998)
        while True:
            msg = input("You: ")
            if msg.lower() == 'exit':
                break
            s.sendto(msg.encode(), server_address)

            try:
                data, _ = s.recvfrom(1024)
                print("Server:", data.decode())
            except socket.timeout:
                print("[UDP] No response, packet may be lost.")


if __name__ == "__main__":
    choice = input("Start TCP or UDP client? (tcp/udp): ").strip().lower()
    if choice == "tcp":
        tcp_client()
    elif choice == "udp":
        udp_client()
    else:
        print("Invalid choice")
