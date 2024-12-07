# Application Deployment Configuration

## Overview

This document explains the configuration changes made to successfully deploy the application on DigitalOcean. The main issues were related to package compatibility with the default Python version used by the buildpack.

## Changes Made

1. **Pinning `setuptools` Version**:
   - The `setuptools` package was causing issues due to an incompatibility with `pkgutil.ImpImporter`. We pinned `setuptools` to version `65.5.0` to avoid this issue.

2. **Adding `wheel` Package**:
   - The `wheel` package was added to ensure that wheels are built correctly for the dependencies.

3. **Specifying Python Version**:
   - Although not necessary in this case, specifying a compatible Python version in `runtime.txt` can help avoid similar issues in the future.

## Updated `requirements.txt`

The `requirements.txt` file now includes the following dependencies:

```pip-requirements
click==7.1.2
Flask==1.1.2
gunicorn==20.0.4
itsdangerous==1.1.0
Jinja2==2.11.3
MarkupSafe==1.1.1
Werkzeug==1.0.1
numpy==1.23.5
tennisim==0.1.0
setuptools==65.5.0
wheel==0.38.4