

  exports.setSuccess=(statusCode, message, data)=> {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = true;
  }

  exports.setError=(statusCode, message)=> {
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
  }

  exports.send=(res)=> {
    const result = {
      success: this.success,
      message: this.message,
      data: this.data,
    };

    if (this.success === true) {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
    });
  }
