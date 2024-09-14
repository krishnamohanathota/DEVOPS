### Common files associated with SSL certificates:

1. PEM File (Privacy Enhanced Mail)

   - Format: .pem
   - Purpose: A PEM file is a container format for encoding SSL certificate information. It can include different types of information such as the certificate, private key, or even the certificate chain. The file is usually encoded in Base64 and starts with -----BEGIN CERTIFICATE----- or -----BEGIN PRIVATE KEY-----.
   - Use: PEM files are widely used by servers like Apache and Nginx. They can store a certificate, a key, or both.

2. KEY File

   - Format: .key
   - Purpose: This file contains the `private key` associated with the SSL certificate. The private key is a crucial element of the SSL certificate because it allows the server to decrypt information sent by the client. The private key must be kept secure.
   - Use: The key file is paired with the certificate to complete the SSL handshake.

3. CRT File

   - Format: .crt
   - Purpose: This is the actual certificate file issued by the Certificate Authority (CA). It contains the public key, domain name, expiration dates, and details of the issuing CA. It ensures that the server is authenticated and trusted by clients (browsers).
   - Use: The CRT file is installed on the server along with the key file. Servers like Apache and Nginx use this file to authenticate with clients.

4. Bundle CRT File (Certificate Bundle)
   - Format: .crt or .ca-bundle
   - Purpose: This file contains the chain of trust, including the intermediate and root certificates. It helps establish the certificate chain back to the trusted root CA, ensuring that clients (like browsers) trust the SSL certificate.
   - Use: Some Certificate Authorities (CAs) provide this file to include intermediate certificates that complete the chain. It's necessary to use this file in combination with the server's certificate to ensure compatibility with all browsers and devices.

#### Summary

- PEM: Can store certificate, private key, or certificate chain (in Base64).
- KEY: Stores the private key, used for decryption.
- CRT: The SSL certificate issued by the CA.
- Bundle CRT: A file containing intermediate and root certificates, establishing the chain of trust.

### What is pfx file ?

A PFX file (also known as `PKCS#12` or `.p12` file) is a binary file format that combines a `certificate` with its corresponding `private key` and any necessary `intermediate certificates` (chain of trust) into one file. This makes it particularly useful for transferring or exporting SSL/TLS certificates along with their private keys in a secure manner.

#### Key uses of a PFX file:

- Combines Certificate and Private Key:

  Unlike a PEM or CRT file that typically contains only the certificate, a PFX file bundles both the certificate and its corresponding private key, making it convenient for moving between servers or platforms.

- Contains the Entire Certificate Chain:

  A PFX file can also include intermediate and root certificates (certificate chain), making it useful for transferring the full SSL/TLS certificate setup to another server without having to install multiple files separately.

- Used for Importing/Exporting Certificates:

  PFX files are often used when exporting certificates from Windows-based servers (such as IIS) and importing them into other servers (such as Apache, Nginx, or cloud services). It simplifies the process of moving a certificate with its private key to a new location.

- Password-Protected:

  Since a PFX file contains sensitive information like the private key, it is usually password-protected to prevent unauthorized access. This adds an extra layer of security when transferring or storing the file.

  Platform Compatibility:

  PFX files are compatible with a wide variety of platforms and servers. For instance:

  - `Windows/IIS`: PFX files are commonly used on Windows servers, especially in IIS (Internet Information Services).
  - `Azure`: Cloud platforms like Azure often require SSL certificates in PFX format when setting up custom domains with HTTPS.

#### Key Points:

- PFX (.pfx) and P12 (.p12) are just different extensions for the same format: PKCS#12 (Public Key Cryptography Standards #12).
- PFX is more commonly used on Windows systems, while P12 is often used on Unix/Linux systems, but they are functionally identical.
- Both are typically password-protected to secure the private key and certificate data contained within them.

### Commands

#### How to generate pfx file

    openssl pkcs12 -inkey privatekey.key -in test.pem -certfile bundle.crt -export -out certificate.pfx

#### Extract certificate and private key from a PFX file

- Extract certificate
  ```
  openssl pkcs12 -in certificate.pfx -clcerts -nokeys -out certificate.crt
  ```
- Extract private key
  ```
  openssl pkcs12 -in certificate.pfx -nocerts -out privatekey.key -nodes
  ```

#### How to check the expiry date of the certificate

- Check the validity period (start and expiration dates) of an SSL/TLS certificate by connecting to a server

  ```
  openssl s_client -connect 20.21.22.168:443 2>/dev/null | openssl x509 -noout -dates
  ```

  ```
  openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates
  ```

- Check the expiration date of an SSL/TLS certificate

  ```
  openssl x509 -in server.crt -noout -enddate
  ```

#### Other commands

- Displays detailed information about a certificate, such as issuer, subject, validity period, etc.:

  ```
  openssl x509 -in server.crt -text -noout
  ```

- Extracting the public key from the certificate

  ```
  openssl x509 -pubkey -noout -in server.crt > public.key
  ```

- Check which SSL/TLS versions are supported by the server

  ```
  openssl s_client -connect example.com:443 -tls1_2
  openssl s_client -connect example.com:443 -tls1_3
  ```

### What is CAA ?

A CAA (Certification Authority Authorization) record is a type of DNS (Domain Name System) record used to specify which Certificate Authorities (CAs) are allowed to issue SSL/TLS certificates for a domain. This adds an extra layer of security by helping to prevent unauthorized or fraudulent issuance of certificates for the domain.

Key features of CAA records:

- Authorization Control: Domain owners can specify which CAs are permitted to issue certificates.
- Prevention of Misissuance: If a CA not listed in the CAA record attempts to issue a certificate, they should refuse.
- Optional Reporting: You can also specify a policy where the CA sends an email to a designated address if they try to issue a certificate that doesn’t comply with the CAA record.

If you want to check your CAA records without logging into GoDaddy, you can use a DNS lookup tool or command-line utility like dig:

```

dig example.com CAA

```

### SSL Certificates verification

https://www.ssllabs.com/ssltest/analyze.html

- If there is any problem is certificate chain, it shwos like this.
  For example, if you generate p12 (pfx) file using key & certificate, please use the bundle crt file also. Otherwise, you may see an error like this

![](./images/certificate-chain-problem.png)

- When all good with the certificate, you might see the results as below

![](./images/certificate-validation.png)

```

```

```

```
