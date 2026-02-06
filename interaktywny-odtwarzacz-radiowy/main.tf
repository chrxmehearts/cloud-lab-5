provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "react_app_sg" {
  name = "react_app_sg"
  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "react_app" {
  ami = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS
  instance_type = "t2.micro"
  security_groups = [aws_security_group.react_app_sg.name]
  
  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y git nginx curl
              curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
              apt-get install -y nodejs
              git clone https://github.com/chrxmehearts/cloud-lab-5.git /home/ubuntu/app
              cd /home/ubuntu/app
              npm install
              npm run build
              rm -rf /var/www/html/*
              cp -r build/* /var/www/html/
              systemctl restart nginx
              EOF
}