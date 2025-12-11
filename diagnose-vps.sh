#!/bin/bash
# Frame Toque VPS Diagnostic Script
# Run this on your VPS to diagnose 502 errors

echo "========================================="
echo "Frame Toque VPS Diagnostic"
echo "========================================="
echo ""

echo "1. Checking PM2 Status..."
pm2 status
echo ""

echo "2. Checking if port 3000 is in use..."
sudo netstat -tlnp | grep 3000
echo ""

echo "3. Checking Nginx status..."
sudo systemctl status nginx --no-pager
echo ""

echo "4. Checking recent PM2 logs..."
pm2 logs frametoque --lines 50 --nostream
echo ""

echo "5. Checking Nginx error logs..."
sudo tail -20 /var/log/nginx/error.log
echo ""

echo "6. Checking if auto-pull script ran..."
if [ -f /home/ec2-user/frametoque/auto-pull.log ]; then
    tail -20 /home/ec2-user/frametoque/auto-pull.log
else
    echo "Auto-pull log not found"
fi
echo ""

echo "========================================="
echo "Diagnostic Complete"
echo "========================================="
