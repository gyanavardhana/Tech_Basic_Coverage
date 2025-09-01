# https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/

# first pattern

'''
n = 5
for i in range(n):
    for j in range(n):
        print("* ",end="")
    print("\n")
'''

# second pattern

'''
n = 5
for i in range(n):
    for j in range(i+1):
        print("* ",end="")
    print("\n")
'''

# third pattern

'''
n=5
for i in range(n+1):
    for j in range(1,i+1):
        print(j, end="")
    print("\n")
'''

# fourth pattern

'''
n=5
for i in range(n+1):
    for j in range(1,i+1):
        print(i, end="")
    print("\n")
'''

# fifth pattern

'''
n=5 
for i in range(n, 0, -1):
    for j in range(i, 0, -1):
        print("* ", end="")
    print("\n")
'''

# sixth pattern

'''
n=5 
for i in range(n, 0, -1):
    for j in range(i, 0, -1):
        print(j, end="")
    print("\n")
'''

# seventh pattern

'''
n=5
for i in range(n):
    for j in range(0, n-i-1, 1):
        print(" ", end="")
    for j in range(0, 2*i+1, 1):
        print("*", end="")
    for j in range(0, n-i-1, 1):
        print(" ", end="")
    print("\n")
'''

# Eighth pattern
'''
n=5
for i in range(n):
    for j in range(1, i+1):
        print(" ", end="")
    for j in range(2*(n-i)-1):
        print("*", end="")
    for j in range(1, i+1):
        print(" ", end="")
    print("\n")
'''

# Ninth Pattern

'''
n=5
for i in range(n):
    for j in range(0, n-i-1, 1):
        print(" ", end="")
    for j in range(0, 2*i+1, 1):
        print("*", end="")
    for j in range(0, n-i-1, 1):
        print(" ", end="")
    print("\n")
for i in range(n):
    for j in range(1, i+1):
        print(" ", end="")
    for j in range(2*(n-i)-1):
        print("*", end="")
    for j in range(1, i+1):
        print(" ", end="")
    print("\n")
'''

# Tenth Pattern

'''
n=5
for i in range(2*n-1):
    s = i
    if i>n: s = 2*n-i
    for j in range(s):
        print("*",end="")
    print("\n")
'''