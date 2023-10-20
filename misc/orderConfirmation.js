function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  

const getOrderConfirmationMail = (userData, order, profileLink) => {

    const productListHTML = order.items.map(item => {
        return `
                <tr style="border-botom: 1px solid black; font-size: 12px, font-weight: bold;">
                <td><img src="${item.product ? item.product.images[0] : item.image.images[0]}" alt="Product Image" style="width: 50px; height: 50px; object-fit: contain"></td>
                <td>${item.product ? item.product.name : item.image.name}</td>
                <td>${item.product ? item.product.price : item.image.price}</td>
                <td> ${item.quantity}</td>
                </tr>
        `;
    }).join('');

    return `
    <!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		@media (max-width:670px) {
			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style>
</head>

<body style="margin: 0; background-color: #f8f9fa; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f9fa;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f9fa; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000; background-size: auto; color: #000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
																<div class="alignment" align="center" style="line-height:10px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/666028_648381/onClick-logo.png" style="display: block; height: auto; border: 0; max-width: 130px; width: 100%;" width="130"></div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; background-image: url('https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/666028_648381/editor_images/a9163ae8-9fee-4638-95a5-f0a8643d9ce2.png'); background-repeat: no-repeat; background-size: cover; border-radius: 0; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 60px; padding-top: 60px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="font-family: Tahoma, Verdana, sans-serif">
																	<div class style="font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #fbad19; line-height: 1.2;">
																		<p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:50px;">Order confirmation</span></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#fbad19;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:28px;font-weight:300;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:33.6px;">
																	<p style="margin: 0;">Thank you for your purchase</p>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="text_block block-1" width="100%" border="0" cellpadding="30" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="font-family: Tahoma, Verdana, sans-serif">
																	<div class style="font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 20.4px;"><strong><span style="font-size:17px;">Hello ${userData.name},</span></strong></p>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 20.4px;"><strong><span style="font-size:17px;">We're delighted to confirm your recent purchase on onClick. Your order details are as follows:</span></strong></p>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 20.4px;"><strong><span style="font-size:17px;">Order ID: ${order.orderName} Date: ${formatDate(order.date)}</span></strong></p>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 20.4px;"><strong><span style="font-size:17px;">Order Sumary:</span></strong></p><br>
                                                                        <table style="width: 100%">
                                                                        <thead>
                                                                        <tr>
                                                                        <th>Image</th>
                                                                        <th>Name</th>
                                                                        <th>Price</th>
                                                                        <th>Quantity</th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        ${productListHTML}
                                                                        </tbody>
                                                                        </table>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 20.4px;"><strong><span style="font-size:17px;">Your order is now being processed, and we'll notify you once it's ready for shipping. If you have any questions or need further assistance, don't hesitate to reach out our support team at onclickphotography.info@gmail.com.</span></strong></p>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 20.4px;"><strong><span style="font-size:17px;">To track the progress of your order and manage your account, please click the button below to acces your profile:</span></strong></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${profileLink}" style="height:42px;width:124px;v-text-anchor:middle;" arcsize="0%" stroke="false" fillcolor="#000000"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:16px"><![endif]--><a href="${profileLink}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#000000;border-radius:0px;width:auto;border-top:0px solid transparent;font-weight:undefined;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">View profile</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
															</td>
														</tr>
													</table>
													<table class="text_block block-3" width="100%" border="0" cellpadding="30" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="font-family: Tahoma, Verdana, sans-serif">
																	<div class style="font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 20.4px;"><strong>We appreciate your trust in onClick, and we hope you enjoy your purchase. Thank you for being a valued member of our community.</strong></p>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 20.4px;"><strong><span style="font-size:17px;">Warm regards,</span></strong></p>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
																		<p style="margin: 0; font-size: 17px; mso-line-height-alt: 20.4px;"><strong><span style="font-size:17px;">The onClick Team</span></strong></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f9fa; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000; background-size: auto; color: #000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
																<div class="alignment" align="center" style="line-height:10px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/666028_648381/onClick-logo.png" style="display: block; height: auto; border: 0; max-width: 130px; width: 100%;" width="130"></div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>
 
  `;
};

module.exports = getOrderConfirmationMail;