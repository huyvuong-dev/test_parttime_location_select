<?php

namespace Magenest\Location\Plugin\Checkout;

class LayoutProcessor
{
    /**
     * @param \Magento\Checkout\Block\Checkout\LayoutProcessor $subject
     * @param array $jsLayout
     * @return array
     */
    public function afterProcess(
        \Magento\Checkout\Block\Checkout\LayoutProcessor $subject,
        array $jsLayout
    )
    {

        if (isset($_COOKIE['ward']) && isset($_COOKIE['district']) && isset($_COOKIE['city'])){
            $city = $_COOKIE['ward'] . ', ' . $_COOKIE['district'] . ", " . $_COOKIE['city'];
            $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
            ['shippingAddress']['children']['shipping-address-fieldset']['children']['city']['value'] = $city;
        }

        return $jsLayout;
    }
}